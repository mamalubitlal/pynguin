# Pynguin (Pyn) Language

Pynguin - это веб-ориентированный язык программирования, объединяющий HTML, CSS и JavaScript/Lua в едином файле. Он разработан для прямого выполнения в веб-браузерах.
![logo]("logo.png")
## Базовая структура

Файл Pynguin (.pyn) состоит из блоков, отмеченных двоеточием (`:`) для открытия и тильдой (`~`) для закрытия:

```pyn
lua = false  // Использовать JavaScript
// или
lua = true   // Использовать Lua

:html
<div>Hello World</div>
<p>This is a paragraph</p>
~html

:css
body {
    margin: 0;
    padding: 20px;
}
~css

:javascript
// или :lua если установлено lua = true
console.log("Hello from Pynguin!");
~javascript
```

## Особенности

### 1. Отслеживание строк
Строки внутри блоков автоматически нумеруются для ссылок:
```pyn
:html
1<div>First line</div>
2<div>Second line</div>
3<p>Third line</p>
~html

:lua
executeHtmlLine(2)  // Выполняет вторую строку HTML
~lua
```

### 2. Блоки кода
- **HTML блок**: от `:html` до `~html`
- **CSS блок**: от `:css` до `~css`
- **Скриптовый блок**: 
  - JavaScript режим: от `:javascript` до `~javascript`
  - Lua режим: от `:lua` до `~lua`

### 3. Комментарии
Используйте `//` для однострочных комментариев:
```pyn
// Это комментарий
lua = false  // Использовать JavaScript
```

## Использование

1. Подключите интерпретатор Pynguin:
```html
<script src="pynguin-interpreter.js"></script>
```

2. Создайте .pyn файл:
```pyn
lua = false  // Использовать JavaScript

:html
<div class="container">
    <h1>Welcome to Pynguin</h1>
    <div id="content"></div>
</div>
~html

:css
.container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
}
~css

:javascript
// Update content
const content = document.getElementById('content');
content.textContent = "This content was updated using JavaScript!";
~javascript
```

3. Загрузите .pyn файл:
```html
<script>
    const interpreter = new PynguinInterpreter();
    interpreter.loadPynFile('./example.pyn');
</script>
```

4. Или используйте встроенный скрипт:
```html
<script type="text/pynguin">
lua = false

:html
<div id="greeting">Loading...</div>
~html

:css
#greeting {
    font-size: 24px;
    color: blue;
}
~css

:javascript
const greeting = document.getElementById("greeting");
greeting.textContent = "Hello from Pynguin!";
~javascript
</script>
```

## Примеры

### Базовый пример с JavaScript
```pyn
lua = false

:html
<div id="greeting">Loading...</div>
~html

:css
#greeting {
    font-size: 24px;
    color: blue;
}
~css

:javascript
const greeting = document.getElementById("greeting");
greeting.textContent = "Hello from Pynguin!";
~javascript
```

### Использование Lua
```pyn
lua = true

:html
<div id="counter">0</div>
~html

:lua
local count = 0
function incrementCounter()
    count = count + 1
    document.getElementById("counter").textContent = count
end
~lua
```

## Заключение

Pynguin - это мощный инструмент для веб-разработки, объединяющий HTML, CSS и скриптовые языки в одном файле. Он идеально подходит для быстрого прототипирования и обучения.
