// Balatro Calculator JavaScript
class BalatroPowerCalculator {
    constructor() {
        this.defaultHands = {
            'straight-flush': { name: 'Escalera Corrida', baseValue: 100, multiplier: 8, icon: 'bi-suit-spade-fill', color: 'text-dark' },
            'four-kind': { name: 'Póker', baseValue: 60, multiplier: 7, icon: 'bi-suit-club-fill', color: 'text-dark' },
            'full-house': { name: 'Full House', baseValue: 40, multiplier: 4, icon: 'bi-suit-heart-fill', color: 'text-danger' },
            'flush': { name: 'Color', baseValue: 35, multiplier: 4, icon: 'bi-suit-diamond-fill', color: 'text-warning' },
            'straight': { name: 'Escalera', baseValue: 30, multiplier: 4, icon: 'bi-lightning-fill', color: 'text-primary' },
            'three-kind': { name: 'Tercia', baseValue: 30, multiplier: 3, icon: 'bi-triangle-fill', color: 'text-info' },
            'two-pair': { name: 'Doble Par', baseValue: 20, multiplier: 2, icon: 'bi-square-fill', color: 'text-secondary' },
            'pair': { name: 'Par', baseValue: 10, multiplier: 2, icon: 'bi-circle-fill', color: 'text-success' },
            'high-card': { name: 'Carta Más Alta', baseValue: 5, multiplier: 1, icon: 'bi-star-fill', color: 'text-muted' }
        };

        this.currentHands = JSON.parse(JSON.stringify(this.defaultHands)); // Deep copy
        this.init();
    }

    init() {
        this.setupNavigation();
        this.generateHandConfigs();
        this.calculateAll();
        this.updateStrategyRecommendations();
    }

    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link[data-section]');
        const sections = document.querySelectorAll('.section');

        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();

                // Remove active class from all nav links
                navLinks.forEach(nl => nl.classList.remove('active'));
                // Add active class to clicked link
                link.classList.add('active');

                // Hide all sections
                sections.forEach(section => section.classList.remove('active'));
                // Show target section
                const targetSection = document.getElementById(link.dataset.section);
                if (targetSection) {
                    targetSection.classList.add('active');
                }
            });
        });
    }

    generateHandConfigs() {
        const container = document.getElementById('handConfigs');
        container.innerHTML = '';
        container.className = 'balatro-hands-container'; // Change from row layout

        Object.entries(this.currentHands).forEach(([key, hand]) => {
            const handRow = this.createHandConfigCard(key, hand);
            container.appendChild(handRow);
        });
    }

    createHandConfigCard(key, hand) {
        const row = document.createElement('div');
        row.className = 'balatro-hand-row mb-2';

        row.innerHTML = `
            <div class="balatro-hand-container">
                <div class="hand-level">
                    <button class="level-btn minus" onclick="calculator.adjustLevel('${key}', -1)">-</button>
                    <span class="level-prefix">Nvl.</span>
                    <input type="number" class="level-input" id="level-${key}" value="1" min="1" max="15">
                    <button class="level-btn plus" onclick="calculator.adjustLevel('${key}', 1)">+</button>
                </div>
                <div class="hand-name-section">
                    <span class="hand-name-text">${hand.name}</span>
                </div>
                <div class="hand-values">
                    <div class="value-pill blue-pill">
                        <button class="pill-btn minus" onclick="calculator.adjustValue('base-${key}', -5)">-</button>
                        <input type="number" class="pill-input" id="base-${key}" value="${hand.baseValue}" min="0" max="1000">
                        <button class="pill-btn plus" onclick="calculator.adjustValue('base-${key}', 5)">+</button>
                    </div>
                    <div class="multiplier-x">×</div>
                    <div class="value-pill red-pill">
                        <button class="pill-btn minus" onclick="calculator.adjustValue('mult-${key}', -0.5)">-</button>
                        <input type="number" class="pill-input" id="mult-${key}" value="${hand.multiplier}" min="0" max="50" step="0.1">
                        <button class="pill-btn plus" onclick="calculator.adjustValue('mult-${key}', 0.5)">+</button>
                    </div>
                </div>
                <div class="hand-result">
                    <span class="result-symbol">=</span>
                    <span class="result-value" id="result-${key}">0</span>
                </div>
            </div>
        `;

        // Add event listeners
        const baseInput = row.querySelector(`#base-${key}`);
        const multInput = row.querySelector(`#mult-${key}`);
        const levelInput = row.querySelector(`#level-${key}`);

        baseInput.addEventListener('input', () => this.updateHandCalculation(key));
        multInput.addEventListener('input', () => this.updateHandCalculation(key));
        levelInput.addEventListener('input', () => this.updateHandLevel(key));

        return row;
    }

    updateHandCalculation(key) {
        const baseValue = parseInt(document.getElementById(`base-${key}`).value) || 0;
        const multiplier = parseFloat(document.getElementById(`mult-${key}`).value) || 0;

        console.log(`🔄 updateHandCalculation(${key}):`, {
            chips: baseValue,
            mult: multiplier
        });

        this.currentHands[key].baseValue = baseValue;
        this.currentHands[key].multiplier = multiplier;

        // Calcular poder total directamente (los valores ya incluyen el escalado de nivel)
        const total = this.calculateHandPower(baseValue, multiplier);

        console.log(`💫 Final calculation for ${key}:`, {
            formula: `${baseValue} × ${multiplier} = ${total}`,
            total: total
        });

        // Update result display 
        const resultElement = document.getElementById(`result-${key}`);
        if (resultElement) {
            resultElement.textContent = this.formatNumber(total);
            console.log(`📱 Updated result display for ${key}: ${this.formatNumber(total)}`);
        }

        // Update the full ranking
        this.updateRanking();
    }

    calculateHandPower(baseValue, multiplier) {
        return Math.round(baseValue * multiplier);
    }

    updateRanking() {
        // This method updates only the ranking section without recalculating individual results
        this.calculateAll();
    }

    calculateAll() {
        const results = [];

        Object.entries(this.currentHands).forEach(([key, hand]) => {
            const baseValue = parseInt(document.getElementById(`base-${key}`)?.value) || hand.baseValue;
            const multiplier = parseFloat(document.getElementById(`mult-${key}`)?.value) || hand.multiplier;

            // Los valores en los campos ya incluyen el escalado de nivel
            const total = this.calculateHandPower(baseValue, multiplier);

            // Update result display in each row
            const resultElement = document.getElementById(`result-${key}`);
            if (resultElement) {
                resultElement.textContent = this.formatNumber(total);
            }

            results.push({
                key,
                name: hand.name,
                icon: hand.icon,
                color: hand.color,
                baseValue,
                multiplier,
                total
            });
        });

        // Sort by total power
        results.sort((a, b) => b.total - a.total);

        this.displayResults(results);
        this.updateStrategyRecommendations(results);
    }

    displayResults(results) {
        const resultsContainer = document.getElementById('results');
        resultsContainer.innerHTML = '';

        if (results.length === 0) {
            resultsContainer.innerHTML = '<p class="text-muted text-center">No hay resultados que mostrar</p>';
            return;
        }

        results.forEach((result, index) => {
            const rank = index + 1;
            const rankClass = rank === 1 ? 'rank-1' : rank === 2 ? 'rank-2' : rank === 3 ? 'rank-3' : 'rank-other';

            const resultCard = document.createElement('div');
            resultCard.className = `result-card ${rankClass} card mb-3 fade-in-up`;
            resultCard.style.animationDelay = `${index * 0.1}s`;

            resultCard.innerHTML = `
                <div class="card-body">
                    <div class="d-flex align-items-center">
                        <div class="rank-badge">
                            ${this.getRankSymbol(rank)}
                        </div>
                        <div class="flex-grow-1">
                            <div class="d-flex justify-content-between align-items-start">
                                <div>
                                    <h5 class="card-title mb-1">
                                        <i class="${result.icon} ${result.color} me-2"></i>
                                        ${result.name}
                                    </h5>
                                    <p class="card-text text-muted mb-2">
                                        ${result.baseValue} × ${result.multiplier} = 
                                        <span class="fw-bold fs-4 ${rank <= 3 ? 'text-primary' : 'text-secondary'}">
                                            ${result.total.toLocaleString()}
                                        </span> puntos
                                    </p>
                                </div>
                                <div class="text-end">
                                    <span class="badge bg-primary fs-6 px-3 py-2">
                                        #{rank}
                                    </span>
                                </div>
                            </div>
                            ${rank <= 3 ? this.getTopTierRecommendation(result, rank) : ''}
                        </div>
                    </div>
                </div>
            `;

            resultsContainer.appendChild(resultCard);
        });
    }

    getRankSymbol(rank) {
        switch (rank) {
            case 1: return '🥇';
            case 2: return '🥈';
            case 3: return '🥉';
            default: return rank;
        }
    }

    getTopTierRecommendation(result, rank) {
        const recommendations = {
            1: `<div class="alert alert-warning mt-2 mb-0">
                    <i class="bi bi-star-fill me-1"></i>
                    <strong>¡Tu mano principal!</strong> Prioriza buscar cartas que potencien ${result.name.toLowerCase()}.
                 </div>`,
            2: `<div class="alert alert-info mt-2 mb-0">
                    <i class="bi bi-award me-1"></i>
                    <strong>Excelente alternativa.</strong> Mantén ${result.name.toLowerCase()} como opción secundaria.
                 </div>`,
            3: `<div class="alert alert-success mt-2 mb-0">
                    <i class="bi bi-trophy me-1"></i>
                    <strong>Muy competitiva.</strong> ${result.name} es una opción sólida.
                 </div>`
        };

        return recommendations[rank] || '';
    }

    updateStrategyRecommendations(results = null) {
        const container = document.getElementById('strategyRecommendations');

        if (!results) {
            // Calculate current results
            results = [];
            Object.entries(this.currentHands).forEach(([key, hand]) => {
                const baseValue = parseInt(document.getElementById(`base-${key}`)?.value) || hand.baseValue;
                const multiplier = parseFloat(document.getElementById(`mult-${key}`)?.value) || hand.multiplier;

                results.push({
                    key,
                    name: hand.name,
                    total: this.calculateHandPower(baseValue, multiplier)
                });
            });
            results.sort((a, b) => b.total - a.total);
        }

        const top3 = results.slice(0, 3);
        const powerGap = top3.length > 1 ? top3[0].total - top3[1].total : 0;
        const isCloseDiff = powerGap < 200;

        container.innerHTML = `
            <div class="row">
                <div class="col-md-6">
                    <div class="strategy-tip">
                        <div class="d-flex align-items-start">
                            <i class="bi bi-lightbulb-fill tip-icon me-3 mt-1"></i>
                            <div>
                                <h6 class="fw-bold">🎯 Enfoque Principal</h6>
                                <p class="mb-1">
                                    <strong>${top3[0]?.name}</strong> es tu mano más poderosa con 
                                    <span class="fw-bold text-primary">${top3[0]?.total.toLocaleString()}</span> puntos.
                                </p>
                                <small class="text-muted">
                                    Busca jokers y cartas que potencien esta mano.
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="strategy-tip">
                        <div class="d-flex align-items-start">
                            <i class="bi bi-shield-fill-check tip-icon me-3 mt-1"></i>
                            <div>
                                <h6 class="fw-bold">🛡️ Plan B</h6>
                                <p class="mb-1">
                                    <strong>${top3[1]?.name}</strong> como alternativa sólida 
                                    (${top3[1]?.total.toLocaleString()} puntos).
                                </p>
                                <small class="text-muted">
                                    ${isCloseDiff ? 'Muy cerca del primer lugar - considera ambas.' : 'Buena opción de respaldo.'}
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-12 mt-3">
                    <div class="strategy-tip">
                        <div class="d-flex align-items-start">
                            <i class="bi bi-graph-up tip-icon me-3 mt-1"></i>
                            <div>
                                <h6 class="fw-bold">📊 Análisis del Meta</h6>
                                <p class="mb-2">Top 3 manos actuales:</p>
                                <ol class="mb-1">
                                    ${top3.map((hand, index) =>
            `<li><strong>${hand.name}</strong> — ${hand.total.toLocaleString()} puntos</li>`
        ).join('')}
                                </ol>
                                <small class="text-muted">
                                    ${powerGap > 500 ?
                '🔥 Hay una clara mano dominante. Enfócate en ella.' :
                '⚖️ Las manos están equilibradas. Mantén flexibilidad.'
            }
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    resetHand(handKey) {
        const defaultHand = this.defaultHands[handKey];
        if (defaultHand) {
            document.getElementById(`level-${handKey}`).value = 1;
            document.getElementById(`base-${handKey}`).value = defaultHand.baseValue;
            document.getElementById(`mult-${handKey}`).value = defaultHand.multiplier;
            this.updateHandCalculation(handKey);
        }
    }

    resetAll() {
        Object.keys(this.defaultHands).forEach(key => {
            this.resetHand(key);
        });
    }

    updateHandLevel(key) {
        const level = parseInt(document.getElementById(`level-${key}`).value) || 1;
        const baseHand = this.defaultHands[key];

        console.log(`🔄 updateHandLevel(${key}):`, {
            level: level,
            defaultValues: { chips: baseHand.baseValue, mult: baseHand.multiplier }
        });

        // Calcular los valores escalados según el nivel
        const scaling = this.getHandScaling(key, level, true); // true = usar valores base por defecto

        console.log(`📈 Scaling result for ${key} level ${level}:`, scaling);

        // Actualizar los campos de entrada con los valores escalados
        document.getElementById(`base-${key}`).value = scaling.base;
        document.getElementById(`mult-${key}`).value = Number.isInteger(scaling.mult) ? scaling.mult.toString() : scaling.mult.toFixed(1);

        console.log(`📝 Updated UI fields for ${key}:`, {
            chips: scaling.base,
            mult: Number.isInteger(scaling.mult) ? scaling.mult.toString() : scaling.mult.toFixed(1)
        });

        // Actualizar el cálculo
        this.updateHandCalculation(key);
    }

    getHandScaling(key, level, useDefaults = false) {
        console.log(`🧮 getHandScaling(${key}, ${level}, useDefaults: ${useDefaults})`);

        // Obtener los valores base - SIEMPRE usar defaults reales para escalado de nivel
        let currentChips, currentMult;

        if (useDefaults) {
            // Para escalado de nivel, SIEMPRE usar los valores originales del juego
            currentChips = this.defaultHands[key].baseValue;
            currentMult = this.defaultHands[key].multiplier;
        } else {
            // Para cálculos normales, usar valores actuales de los campos
            currentChips = parseInt(document.getElementById(`base-${key}`)?.value) || this.defaultHands[key].baseValue;
            currentMult = parseFloat(document.getElementById(`mult-${key}`)?.value) || this.defaultHands[key].multiplier;
        }

        console.log(`📊 Base values for ${key}:`, {
            chips: currentChips,
            mult: currentMult,
            source: useDefaults ? 'true defaults from game' : 'UI fields',
            originalDefaults: { chips: this.defaultHands[key].baseValue, mult: this.defaultHands[key].multiplier }
        });

        let finalChips = currentChips;
        let finalMult = currentMult;

        // Escalado oficial de Balatro basado en Planet Cards
        const levelUps = level - 1; // Cuántas veces se ha subido de nivel

        console.log(`⬆️ Level ups for ${key}: ${levelUps} (level ${level} - 1)`);

        let chipBonus = 0;
        let multBonus = 0;

        switch (key) {
            case 'high-card':
                // Pluto: +10 Chips y +1 Mult por nivel
                chipBonus = levelUps * 10;
                multBonus = levelUps * 1;
                finalChips = currentChips + chipBonus;
                finalMult = currentMult + multBonus;
                break;

            case 'pair':
                // Mercury: +15 Chips y +1 Mult por nivel
                chipBonus = levelUps * 15;
                multBonus = levelUps * 1;
                finalChips = currentChips + chipBonus;
                finalMult = currentMult + multBonus;
                break;

            case 'two-pair':
                // Saturn: +20 Chips y +1 Mult por nivel
                chipBonus = levelUps * 20;
                multBonus = levelUps * 1;
                finalChips = currentChips + chipBonus;
                finalMult = currentMult + multBonus;
                break;

            case 'three-kind':
                // Earth: +20 Chips y +2 Mult por nivel
                chipBonus = levelUps * 20;
                multBonus = levelUps * 2;
                finalChips = currentChips + chipBonus;
                finalMult = currentMult + multBonus;
                break;

            case 'straight':
                // Uranus: +30 Chips y +3 Mult por nivel
                chipBonus = levelUps * 30;
                multBonus = levelUps * 3;
                finalChips = currentChips + chipBonus;
                finalMult = currentMult + multBonus;
                break;

            case 'flush':
                // Neptune: +15 Chips y +2 Mult por nivel
                chipBonus = levelUps * 15;
                multBonus = levelUps * 2;
                finalChips = currentChips + chipBonus;
                finalMult = currentMult + multBonus;
                break;

            case 'full-house':
                // Venus: +25 Chips y +2 Mult por nivel
                chipBonus = levelUps * 25;
                multBonus = levelUps * 2;
                finalChips = currentChips + chipBonus;
                finalMult = currentMult + multBonus;
                break;

            case 'four-kind':
                // Ceres: +30 Chips y +3 Mult por nivel
                chipBonus = levelUps * 30;
                multBonus = levelUps * 3;
                finalChips = currentChips + chipBonus;
                finalMult = currentMult + multBonus;
                break;

            case 'straight-flush':
                // Eris: +40 Chips y +3 Mult por nivel
                chipBonus = levelUps * 40;
                multBonus = levelUps * 3;
                finalChips = currentChips + chipBonus;
                finalMult = currentMult + multBonus;
                break;
        }

        console.log(`🚀 Planet Card bonus for ${key}:`, {
            chipBonus: chipBonus,
            multBonus: multBonus,
            calculation: `${currentChips} + ${chipBonus} = ${finalChips} chips, ${currentMult} + ${multBonus} = ${finalMult} mult`
        });

        return { base: finalChips, mult: finalMult };
    }

    adjustLevel(handKey, change) {
        const levelInput = document.getElementById(`level-${handKey}`);
        if (levelInput) {
            const currentLevel = parseInt(levelInput.value) || 1;
            const newLevel = Math.max(1, Math.min(15, currentLevel + change));
            levelInput.value = newLevel;

            console.log(`🎚️ adjustLevel(${handKey}):`, {
                oldLevel: currentLevel,
                change: change,
                newLevel: newLevel,
                constrained: newLevel !== currentLevel + change
            });

            this.updateHandLevel(handKey);
        }
    }

    adjustValue(inputId, change) {
        const input = document.getElementById(inputId);
        if (input) {
            const currentValue = parseFloat(input.value) || 0;
            const step = inputId.includes('mult') ? 0.1 : 1;
            const newValue = Math.max(0, currentValue + change);

            if (inputId.includes('mult')) {
                // Para multiplicadores, mostrar decimales solo si es necesario
                input.value = Number.isInteger(newValue) ? newValue.toString() : newValue.toFixed(1);
            } else {
                // Para chips, siempre enteros
                input.value = Math.round(newValue);
            }

            console.log(`🎛️ adjustValue(${inputId}):`, {
                oldValue: currentValue,
                change: change,
                newValue: input.value,
                type: inputId.includes('mult') ? 'multiplier' : 'chips'
            });

            // Trigger calculation update
            const handKey = inputId.replace(/^(base|mult)-/, '');
            this.updateHandCalculation(handKey);
        }
    }

    formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return Math.floor(num).toString();
    }
}

// Initialize the calculator when the page loads
let calculator;

document.addEventListener('DOMContentLoaded', function () {
    calculator = new BalatroPowerCalculator();

    // Add global functions
    window.calculateAll = function () {
        calculator.calculateAll();
    };

    window.resetAll = function () {
        calculator.resetAll();
    };
});

// Add some utility functions
function showTooltip(element, message) {
    // Simple tooltip functionality
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip bs-tooltip-top show';
    tooltip.innerHTML = `<div class="tooltip-inner">${message}</div>`;
    document.body.appendChild(tooltip);

    const rect = element.getBoundingClientRect();
    tooltip.style.position = 'absolute';
    tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
    tooltip.style.top = rect.top - tooltip.offsetHeight - 5 + 'px';

    setTimeout(() => {
        document.body.removeChild(tooltip);
    }, 2000);
}

// Add keyboard shortcuts
document.addEventListener('keydown', function (e) {
    if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
            case 'r':
                e.preventDefault();
                calculator.calculateAll();
                showTooltip(document.body, 'Resultados recalculados');
                break;
            case 'Enter':
                e.preventDefault();
                calculator.calculateAll();
                break;
        }
    }
});