## [Pizza](https://evgeniyl0.github.io/pizza-test/)  
Пример SPA для просмотра и редактирования информации о работниках пиццерии, реализованного с  использованием фреймворка Nuxt.js. Для хранения данных используется база данных Firebase.

### Функционал:
- отображение информации о работниках, получаемой из базы данных, в виде таблицы;
- сортировка данных таблицы по имени работника, по дате рождения;
- фильтрация данных таблицы по должности работника, по статусу "в архиве";
- возможность добавлять в базу данных новых работников;
- возможность редактировать информацию о работнике (для компонента карточки каждого работника предусмотрен свой отдельный маршрут в маршрутизаторе).

## Развернуть проект локально:  
1. Скопируйте репозиторий на свой компьютер, выполнив в термиале команду:  
`$ git clone https://github.com/EvgeniyL0/pizza-test.git`.  
  
2. Установите необходимые пакеты: `$ npm install`.  
  
3. Запустите проект на локальном сервере **localhost:3000**: `$ npm run dev`.