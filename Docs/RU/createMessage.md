# Создание пакетов
Настал тот момент, когда вы всё же решились создать свой сервер по Brawl Stars на JavaScript. Но как же нам писать пакеты?

## Начало. Клиентские пакеты.
Для создания пакета, необходимо создать `(название).js` в директории `/Protocol/Messages/(Client|Server)`<br>
* Можно в директории, упомянутой выше создать ещё директорию, для того чтобы сортировать пакеты, но вам придётся менять импорты.

Для начала, рассмотрим создание клиентских пакетов
```js
const PiranhaMessage = require('../../../PiranhaMessage')
const ServerHelloMessage = require('../../Server/Auth/ServerHelloMessage')

class ClientHelloMessage extends PiranhaMessage {
  constructor (bytes, session) {
    super(session)
    this.id = 10100
    this.version = 0
    this.stream = this.DataStream.getByteStream(bytes)
  }

  async decode () {
    this.stream.readInt()
  }

  async execute () {
    await new ServerHelloMessage(this.session).send()
  }
}

module.exports = ClientHelloMessage
```

## Разберём подробнее...
```js
const PiranhaMessage = require('../../../PiranhaMessage')
```
Импорт главного пакета, который наследуют все пакеты игры.
##
```js
const ServerHelloMessage = require('../../Server/Auth/ServerHelloMessage')
```
Импорт одного из пакетов, которым отвечает сервер. Разберём чуть позже их создание.
##
```js
class ClientHelloMessage extends PiranhaMessage { ... }
```
Создание класса нашего пакета, который наследует главный класс `PiranhaMessage`
##
```js
constructor (bytes, session) { ... }
```
Конструктор нашего класса. Принимает такие аргументы как:<br>
`bytes` - Тело пакета, необходимое для ByteStream.<br> 
`session` - Сессия игрока<br>
`args` - Аргументы, которые вы можете передать. Для этого, необходимо поменять файл `/index.js`
##
```js
super(session)
```
Передаём сессию игрока в класс `Messaging`
##
```js
this.id = 10100
this.version = 0
this.stream = this.DataStream.getByteStream(bytes)
```
Создаём переменные, необходимые для общения клиента и сервера. Рассмотрим подробней.
* `this.id` - ID пакета
* `this.version` - версия пакета. Можно не трогать.
* `this.stream` - инстанс `ByteStream`.
##
```js
async decode () { ... }
```
Метод, в котором стоит по заветам SC:RE декодировать пакеты.
* В целом, можно и в `process`, нооо такое себе решение.
##
```js
this.stream.readInt()
```
Вот так и происходит чтение пакета. Для примера, мы читаем `Int` (4 байта).

Есть ещё следующие методы, которыми вы в основном будете читать содержимое тела пакета:
```js
this.stream.readVInt()
```
Читаем `VarInt`. Может быть любое количество байтов.
```js
this.stream.readString()
```
Читаем строку. Первые 4 байта (Int) - длина строки, затем строка, зашифрованная в байты. 
```js
this.stream.readBoolean()
```
Читаем булевое значение. (1 байт)
##
```js
async execute () { ... }
```
Вот тут вы пишете ваш код.
##
```js
await new ServerHelloMessage(this.session).send()
```
Инициализация инстанса пакета и его последущая отправка.

Разберём как оно устроено
```js
new ServerHelloMessage(this.session)
```
Инициализируем инстанс пакета, передаём в конструктор сессию игрока.
```js
.send()
```
Шифровка и последующая отправка пакета клиенту.
##
```js
module.exports = ClientHelloMessage
```
Экспортируем класс нашего пакета для последующей инициализации нашим сервером.

Ядро устроено так, что вам нужно написать только пакет. Ничего больше менять не нужно, в отличии от других ядер, где вам необходимо после написания пакета прописывать всю информацию в `MessageFactory`.

## Серверные пакеты.
Фактически, структура класса серверных клиентов не особо отличается от клиентских. Но нам есть что разобрать.
```js
const PiranhaMessage = require('../../../PiranhaMessage')

class ServerHelloMessage extends PiranhaMessage {
  constructor (session) {
    super(session)
    this.id = 20100
    this.version = 0
    this.stream = this.DataStream.ByteStream()
  }

  async encode () {
    this.stream.writeInt(24)
    for (let i = 0; i < 24; i++)
    { this.stream.writeByte(1) }
  }
}

module.exports = ServerHelloMessage
```

## Разберём подробнее серверный пакет.
```js
const PiranhaMessage = require('../../../PiranhaMessage')
```
Я думаю, вы уже усвоили для чего мы пишем эту строку.
##
```js
class ServerHelloMessage extends PiranhaMessage { ... }
```
Также создаём наш класс, который наследуется от `PiranhaMessage`
##
```js
constructor (session) { ... }
```
Конструктор нашего пакета, только в этот раз он принимает только сессию игрока.
##
```js
super(session)
```
Я думаю, вы уже поняли, что этой строкой мы передаём сессию игрока в класс `Messaging`
##
```js
this.id = 20100
this.session = session
this.version = 0
this.stream = this.DataStream.getByteStream()
```
Также, как и с клиентскими пакетами создаём переменные.
* Обратите внимание, что `this.id` у **серверных** пакетов начинается от `20000` до `30000` и от `40000` до `50000`, в то время, как у **клиентских** от `10000` до `20000` и от `30000` до `40000`
##
```js
async encode() {...}
```
Ваш код. Тут же мы и шифруем пакеты.
##
```js
this.stream.writeInt(24)
```
Для примера, мы вписываем `Int` (4 байта) с числом `24`.

Есть ещё следующие методы, которыми вы в основном будете вписывать содержимое тела пакета:
```js
this.stream.writeVInt(128)
```
Вписываем `VarInt`. Может быть любое количество байтов.
```js
this.stream.writeString("Hello, world!")
```
Вписываем строку. Первые 4 байта (Int) - длина строки, затем строка, зашифрованная в байты. 
```js
this.stream.writeBoolean(true)
```
Вписываем булевое значение. (1 байт)
##
```js
for (let i = 0; i < 24; i++)
{ this.stream.writeByte(1) }
```
Тут мы вписываем 24 байта `0x1`
##
```js
module.exports = ServerHelloMessage
```
Экспортируем наш пакет для последующего использования в клиентских пакетах, как было показано выше.

## Каков итог?
Здесь, мы затронули создание своих пакетов для общения между клиентом и сервером.<br>
Мы **читаем** клиентские пакеты и **вписываем** клиентские.
