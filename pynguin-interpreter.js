class PynguinInterpreter {
    constructor() {
        // Инициализация блоков и счетчиков строк
        this.blocks = {
            html: [],
            css: [],
            javascript: [],
            lua: []
        };
        this.lineNumbers = {
            html: 0,
            css: 0,
            javascript: 0,
            lua: 0
        };
        this.currentBlock = null;
        this.errors = [];
        this.useLua = false; // По умолчанию используем JavaScript
    }

    async loadPynFile(filePath) {
        try {
            const response = await fetch(filePath);
            const code = await response.text();
            this.execute(code);
        } catch (error) {
            this.reportError('FILE_ERROR', `Failed to load .pyn file: ${error.message}`);
        }
    }

    execute(code) {
        this.parse(code);
        if (this.errors.length === 0) {
            this.transpileAndRender();
        } else {
            this.reportErrors();
        }
    }

    parse(code) {
        const lines = code.split('\n');
        
        // Сброс блоков и счетчиков
        this.blocks = {
            html: [],
            css: [],
            javascript: [],
            lua: []
        };
        this.lineNumbers = {
            html: 0,
            css: 0,
            javascript: 0,
            lua: 0
        };
        
        // Проверка режима Lua/JavaScript
        const firstLine = lines[0].trim();
        if (firstLine.startsWith('lua = ')) {
            this.useLua = firstLine.includes('true');
            lines.shift();
        }

        let currentBlock = null;
        lines.forEach(line => {
            line = line.trim();
            
            // Пропуск пустых строк и комментариев
            if (!line || line.startsWith('//')) return;

            if (line.startsWith(':')) {
                const blockType = line.slice(1).trim().toLowerCase();
                if (blockType in this.blocks) {
                    currentBlock = blockType;
                } else {
                    this.reportError('INVALID_BLOCK', `Unknown block type: ${blockType}`);
                }
            } else if (line.startsWith('~')) {
                currentBlock = null;
            } else if (currentBlock) {
                this.lineNumbers[currentBlock]++;
                this.blocks[currentBlock].push({
                    lineNum: this.lineNumbers[currentBlock],
                    content: line
                });
            }
        });
    }

    transpileAndRender() {
        // Добавление стилей
        if (this.blocks.css.length > 0) {
            const styleElement = document.createElement('style');
            this.blocks.css.forEach(line => {
                styleElement.textContent += `${line.content}\n`;
            });
            document.head.appendChild(styleElement);
        }

        // Добавление HTML
        if (this.blocks.html.length > 0) {
            const container = document.createElement('div');
            this.blocks.html.forEach(line => {
                container.innerHTML += `${line.content}\n`;
            });
            document.body.appendChild(container);
        }

        // Выполнение скриптов
        const scriptType = this.useLua ? 'lua' : 'javascript';
        if (this.blocks[scriptType].length > 0) {
            const scriptElement = document.createElement('script');
            scriptElement.textContent = this.blocks[scriptType]
                .map(line => line.content)
                .join('\n');
            document.body.appendChild(scriptElement);
        }
    }

    reportError(type, message) {
        console.error(`[${type}] ${message}`);
        this.errors.push({ type, message });
    }
}

// Создание и экспорт экземпляра интерпретатора
window.PynguinInterpreter = PynguinInterpreter;

// Автоматическое выполнение .pyn файлов при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    const interpreter = new PynguinInterpreter();
    
    // Поиск и выполнение встроенных .pyn скриптов
    document.querySelectorAll('script[type="text/pynguin"]').forEach(script => {
        interpreter.execute(script.textContent);
    });
});
