# Социальная сеть

*Используемые технологии: react, redux, express, socket.io, firebase, jwt*

--- 

## Запуск

Для начала нужно добавить файл `creds.json` в `/server/`. 

Файл нужно сгенерировать со стороны firebase:  
Firebase -> Project settings -> Service accounts -> кнопка 'Generate new private key'

Для запуска проекта необходимо зайти в каталоги `server`, `socket`, `client` и ввести команды  
- `npm i`
- `npm start`

`localhost` - frontend  
`http://localhost:5000` - server  
`http://localhost:8800` - socket.io  

## Функционал

<details>
  <summary markdown="span"> Вход в соц.сеть: создание аккаунта/вход по username + password</summary>
  Для входа создается аккаунт. Далее вход по username + password.  
  
  При входе генерируется токен и сохраняется в localStorage.  
  
  Время жизни токена - 1 час

  ![Домашняя страница при входе](https://github.com/MaryaKaysina/social-network/blob/images/home.png)
</details>

<details>
 <summary markdown="span"> Создание постов</summary>
  При создании постов, можно к нему добавлять картинку.  
  
  Картинки сохраняются на сервере `server/public/images`

  ![Создание поста](https://github.com/MaryaKaysina/social-network/blob/images/share.png)
</details>

<details>
 <summary markdown="span"> Подписка/отписка на других пользователей</summary>
  При подписке в ленте постов на странице /home будут отображаться также посты этих пользователей
</details>

<details>
 <summary markdown="span"> Проставление лайков постов</summary>
  На каждом посте можно проставить лайк. Повторный клик убирает его
</details>

<details>
 <summary markdown="span"> Страницы профилей `/profile/:id`</summary>
  У каждого пользователя есть страница его профиля. Если зайти на свою страницу, можно редактировать информацию о себе. 

  На страницах чужих профилей информацию можно только просматривать

  ![Страница профиля](https://github.com/MaryaKaysina/social-network/blob/images/profile.png)
  ![Редактирование профиля](https://github.com/MaryaKaysina/social-network/blob/images/info.png)
</details>

<details>
 <summary markdown="span"> Страницы чатов `/chat`</summary>
  На странице чатов отображаются пользователи, с которыми у текущего пользователя есть чаты.  
  У пользователей есть индикатор онлайн/оффлайн.

  Переписка в чате идет в real-time и при отправке от одного пользователя, сообщение отображается у второго

  ![Страница чатов](https://github.com/MaryaKaysina/social-network/blob/images/chats.png)
</details>
