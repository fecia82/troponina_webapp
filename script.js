const form = document.getElementById('form');
const resultado = document.getElementById('resultado');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const tipo = document.getElementById('tipo').value;
    const concentracion_0h = parseFloat(document.getElementById('concentracion_0h').value);
    const concentracion_1h = parseFloat(document.getElementById('concentracion_1h').value);

    const delta = concentracion_1h - concentracion_0h;
    const valores = getValores(tipo);

    if (concentracion_0h < valores.veryLow || (concentracion_0h < valores.low && delta < valores.no1hDelta)) {
        resultado.textContent = 'Rule-out (verde)';
    } else if (concentracion_0h >= valores.high || delta >= valores.delta1h) {
        resultado.textContent = 'Rule-in (amarillo)';
    } else {
        resultado.textContent = 'Observación';
    }

    resultado.classList.remove('hidden');
});

function getValores(tipo) {    const valores = {
    elecsys: { veryLow: 5, low: 12, no1hDelta: 3, high: 52, delta1h: 5 },
    architect: { veryLow: 4, low: 5, no1hDelta: 2, high: 64, delta1h: 6 },
    centaur: { veryLow: 3, low: 6, no1hDelta: 3, high: 120, delta1h: 12 },
    access: { veryLow: 4, low: 5, no1hDelta: 4, high: 50, delta1h: 15 },
    clarity: { veryLow: 1, low: 2, no1hDelta: 1, high: 30, delta1h: 6 },
    vitros: { veryLow: 1, low: 2, no1hDelta: 1, high: 40, delta1h: 4 },
    pathfast: { veryLow: 3, low: 4, no1hDelta: 3, high: 90, delta1h: 20 },
    triagetrue: { veryLow: 4, low: 5, no1hDelta: 3, high: 60, delta1h: 8 },
};

return valores[tipo];
}

