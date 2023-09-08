class magicFocus {
    constructor(parent) {
        this.parent = parent;

        if (!this.parent) return;

        this.focus = document.createElement('div');
        this.focus.classList.add('magic-focus');
        this.parent.classList.add('has-magic-focus');
        this.parent.appendChild(this.focus);

        for (const input of this.parent.querySelectorAll('input, textarea, select')) {
            input.addEventListener('focus', () => {
                window.magicFocus.show();
            });
            input.addEventListener('blur', () => {
                window.magicFocus.hide();
            });
        }
    }

    show() {
        const el = document.activeElement;

        if (!['INPUT', 'SELECT', 'TEXTAREA'].includes(el.nodeName)) return;

        clearTimeout(this.reset);

        let targetElement = el;

        if (['checkbox', 'radio'].includes(el.type)) {
            targetElement = document.querySelector(`[for=${el.id}]`);
        }

        this.focus.style.top = `${targetElement.offsetTop || 0}px`;
        this.focus.style.left = `${targetElement.offsetLeft || 0}px`;
        this.focus.style.width = `${targetElement.offsetWidth || 0}px`;
        this.focus.style.height = `${targetElement.offsetHeight || 0}px`;
    }

    hide() {
        const el = document.activeElement;

        if (!['INPUT', 'SELECT', 'TEXTAREA', 'LABEL'].includes(el.nodeName)) {
            this.focus.style.width = '0';
        }

        this.reset = setTimeout(() => {
            window.magicFocus.focus.removeAttribute('style');
        }, 200);
    }
}

// initialize
window.magicFocus = new magicFocus(document.querySelector('.form'));

$(() => {
    $('.select').customSelect();
});
