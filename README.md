#Hipsweet

Домашняя работа на курсе Loftschool для новичков. 
Необходимо сверстать лендинг из PSD фиксированной ширины.

##Начало

###Зависимости

Необходимо установить

* [Ruby](https://www.ruby-lang.org/)
* [Sass](http://sass-lang.com/)
* [Susy](http://susydocs.oddbird.net/en/latest/)
* [Compass](http://compass-style.org/)
* [NodeJS](https://nodejs.org/)
* [Bower](https://bower.io/)
* [Python 3](https://www.python.org/) - для Деплоя
* [Nginx](https://nginx.org) - для "Боеевого сервера"

Для установки на OS X

```
$ brew install ruby
$ gem install sass
$ gem install compass
$ gem install susy
$ npm install -g bower
```

для установки NodeJS скачайте [установщик](https://nodejs.org/en/download/)

Для установки на другие платформы, поситите оффициальные сайты (ссылки выше)

###Устанвка

```
$ git clone https://github.com/mitrofun/hipsweet
$ cd hipsweet
$ npm i
$ node_modules/gulp/bin/gulp.js build
```

## Деплой

Для выкладывания на продакшен сделан скрипт для ubuntu.

```
$ virtualenv .env --no-site-packages -p python3
$ source .env/bin/activate
$ pip install -r requirements.txt
$ cp settings.py.example settings.py
$ fab deploy
```

## Authors

* **Dmitriy Shesterkin** - *Initial work* - [mitrofun](https://github.com/mitrofun)

See also the list of [contributors](https://github.com/mitrofun/drugofilter/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
