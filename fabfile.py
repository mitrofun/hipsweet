#!/usr/bin/env python
# -*- coding: utf-8 -*-
import os
from fabric.api import *
from fabric.colors import red
from fabric.contrib.files import upload_template
from settings import USER, PASS
from settings import HOSTS, DOMAIN, SUBDOMAIN

REPO = 'https://github.com/mitrofun/hipsweet'
PROJECT_NAME = 'hipsweet'
PROJECTS_DIR = 'projects'
PROJECT_DIR = '{projects_dir}/{project}'.format(projects_dir=PROJECTS_DIR, project=PROJECT_NAME)
env.hosts = HOSTS


def clone_project():
    with cd(PROJECTS_DIR):
        try:
            run('git clone {repo}'.format(repo=REPO))
        except:
            print(red('dir {} already have, del dir and clone again'.format(PROJECT_NAME)))
            run('rm -rf {project}'.format(project=PROJECT_NAME))
            run('git clone {repo}'.format(repo=REPO))


def create_config(build):
    if build:
        env.root += 'build/'
    context = {
        'domain': env.domain,
        'root': env.root
    }
    env.nginx = '{}/config/nginx.conf'.format(env.project_dir)
    upload_template('config/nginx.template', env.nginx, context, use_jinja=True, )


def link_conf():
    nginx_link = '/etc/nginx/sites-enabled/{}.conf'.format(env.domain)
    sudo('ln -s {} {}'.format(env.nginx, nginx_link))


@task
def reload():
    """
    Рестарт nginx
    :return:
    """
    sudo('nginx -s reload')


@task
def install_bower():
    sudo('apt-get install nodejs -y')
    sudo('apt-get install npm -y')
    sudo('npm install -g bower')
    sudo('ln -s /usr/bin/nodejs /usr/bin/node')


def bower_install():
    with cd(env.root):
        try:
            run('bower i')
        except:
            install_bower()
            run('bower i')


@task
def update(user=USER, pas=PASS):
    """
    Загружаем последние изменения и рестартим nginx
    :param user: Пользователь
    :param pas: Пароль
    :return: Обновление проекта
    """
    env.user = user
    env.password = pas
    with cd(PROJECT_DIR):
        run('git pull origin master')
        run('npm i')
        run('bundle install')
        run('npm run build')
    reload()


def initial_setting(user, pas):
    env.user = user
    env.password = pas
    env.work = SUBDOMAIN
    env.domain = '{}.{}'.format(SUBDOMAIN, DOMAIN)
    env.project_dir = '/home/{user}/projects/{project}'.format(user=user, project=PROJECT_NAME)
    env.root = '/home/{user}/projects/{project}/'.format(user=user, project=PROJECT_NAME)


@task(alias='deploy')
def config_deploy(user=USER, pas=PASS):
    env.build = True
    initial_setting(user, pas)
    clone_project()
    bower_install()
    with cd(env.root):
        run('npm i')
        run('bundle install')
        run('npm run build')
    create_config(env.build)
    link_conf()
    reload()
