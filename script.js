window.addEventListener('load', () => {
    document.getElementById('modal').classList.add('hidden');
});

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form');
    const tipo = document.getElementById('tipo');

    const opciones = [
        { nombre: 'hs-cTn I (Architect; Abbott)', valores: [4, 5, 2, 64, 6] },
        { nombre: 'hs-cTn T (Elecsys; Roche)', valores: [5, 12, 3, 52, 5] },
        { nombre: 'hs-cTn I (Centaur; Siemens)', valores: [3, 6, 3, 120, 12] },
        { nombre: 'hs-cTn I (Access; Beckman Coulter)', valores: [4, 5, 4, 50, 15] },
        { nombre: 'hs-cTn I (Clarity; Singulex)', valores: [1, 2, 1, 30, 6] },
        { nombre: 'hs-cTn I (Vitros; Clinical Diagnostics)', valores: [1, 2, 1, 40, 4] },
        { nombre: 'hs-cTn I (Pathfast; LSI Medience)', valores: [3, 4, 3, 90, 20] },
        { nombre: 'hs-cTn I (TriageTrue; Quidel)', valores: [4, 5, 3, 60, 8] }
    ];

    opciones.forEach(opcion => {
        const opt = document.createElement('option');
        opt.value = opcion.valores.join(',');
        opt.textContent = opcion.nombre;
        tipo.appendChild(opt);
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const concentracion0h = parseFloat(document.getElementById('concentracion_0h').value);
        const concentracion1h = parseFloat(document.getElementById('concentracion_1h').value);
        const valores = tipo.value.split(',').map(val => parseFloat(val));

        const categoria = calcularCategoria(concentracion0h, concentracion1h, valores);

        const resultadoDiv = document.getElementById('resultado');
        resultadoDiv.className = categoria;
        resultadoDiv.textContent = categoria === 'rule-out' ? 'Rule-out' : (categoria === 'rule-in' ? 'Rule-in' : 'Observación');

        const modal = document.getElementById('modal');
        modal.classList.remove('hidden');
    });

    function calcularCategoria(concentracion0h, concentracion1h, valores) {
        if (concentracion0h < valores[0] && Math.abs(concentracion1h - concentracion0h) < valores[2]) {
            return 'rule-out';
        } else if (concentracion0h >= valores[3] || Math.abs(concentracion1h - concentracion0h) >= valores[4]) {
            return 'rule-in';
        } else {
            return 'observation';
        }
    }
});

document.getElementById('close').addEventListener('click', () => {
    document.getElementById('modal').classList.add('hidden');
});

document.getElementById('recalcular').addEventListener('click', () => {
    document.getElementById('modal').classList.add('hidden');
    document.getElementById('form').reset();
});
