// App Logic for Electro Papus: Educación para Todos

document.addEventListener('DOMContentLoaded', () => {
    // Load Default Dashboard Data
    switchTab('entidad');
});

/* ==========================================================================
   Social Context Dashboard Tabs
   ========================================================================== */
const statsData = {
    entidad: {
        rezagoPercent: 30.5,
        rezagoCount: '1,302,714 personas (30.5%)',
        pobGeneral: '51.6%',
        pobGeneralVal: 51.6,
        pobModerada: '35.3%',
        pobModeradaVal: 35.3,
        pobExtrema: '16.3%',
        pobExtremaVal: 16.3
    },
    nacional: {
        rezagoPercent: 18.6,
        rezagoCount: '24,249,571 personas (18.6%)',
        pobGeneral: '29.6%',
        pobGeneralVal: 29.6,
        pobModerada: '24.2%',
        pobModeradaVal: 24.2,
        pobExtrema: '5.3%',
        pobExtremaVal: 5.3
    }
};

function switchTab(type) {
    // Toggle active classes on tab buttons
    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(btn => {
        if (btn.textContent.toLowerCase().includes(type === 'entidad' ? 'oaxaca' : 'nacional')) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    const data = statsData[type];
    if (!data) return;

    // Update Radial Progress Circle for Rezago
    // Radius = 50, Circumference = 2 * PI * 50 = 314
    const circle = document.getElementById('rezago-fill');
    const textVal = document.getElementById('rezago-text');
    const textCount = document.getElementById('rezago-count');
    
    if (circle && textVal && textCount) {
        const offset = 314 - (314 * (data.rezagoPercent / 100));
        circle.style.strokeDashoffset = offset;
        textVal.textContent = `${data.rezagoPercent}%`;
        textCount.textContent = data.rezagoCount;
    }

    // Update Poverty Progress Bars
    const updateBar = (barId, valId, value, percent) => {
        const bar = document.getElementById(barId);
        const valText = document.getElementById(valId);
        if (bar && valText) {
            bar.style.width = `${percent}%`;
            valText.textContent = value;
        }
    };

    updateBar('pob-general-bar', 'pob-general-val', data.pobGeneral, data.pobGeneralVal);
    updateBar('pob-moderada-bar', 'pob-moderada-val', data.pobModerada, data.pobModeradaVal);
    updateBar('pob-extrema-bar', 'pob-extrema-val', data.pobExtrema, data.pobExtremaVal);
}
