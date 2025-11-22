// Utilidades adicionales para la Calculadora Balatro
// Este archivo contiene funciones auxiliares y mejoras de UX

class BalatroPowerUtils {
    static formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        }
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toLocaleString();
    }

    static getHandRecommendation(handName, total, rank, totalHands) {
        const percentage = (rank / totalHands) * 100;

        if (rank === 1) {
            return {
                icon: '🎯',
                title: '¡Tu as bajo la manga!',
                text: `${handName} es tu mano dominante. Construye tu estrategia alrededor de ella.`,
                priority: 'high'
            };
        }

        if (rank <= 3) {
            return {
                icon: '⭐',
                title: 'Mano competitiva',
                text: `${handName} es una excelente opción ${rank === 2 ? 'secundaria' : 'alternativa'}.`,
                priority: 'medium'
            };
        }

        if (percentage <= 50) {
            return {
                icon: '📈',
                title: 'Potencial de mejora',
                text: `${handName} tiene potencial. Considera buffearla si encuentras las cartas adecuadas.`,
                priority: 'low'
            };
        }

        return {
            icon: '🔄',
            title: 'Considera reemplazar',
            text: `${handName} está por debajo del promedio. Busca alternativas.`,
            priority: 'very-low'
        };
    }

    static calculateEfficiency(baseValue, multiplier) {
        const total = baseValue * multiplier;
        const efficiency = total / (baseValue + multiplier);

        if (efficiency >= 50) return 'excellent';
        if (efficiency >= 30) return 'good';
        if (efficiency >= 20) return 'average';
        return 'poor';
    }

    static generateInsight(results) {
        const top = results[0];
        const bottom = results[results.length - 1];
        const powerGap = top.total - bottom.total;
        const averagePower = results.reduce((sum, r) => sum + r.total, 0) / results.length;

        let insight = '';

        if (powerGap > 1000) {
            insight = `🔥 Meta muy polarizado: ${top.name} domina claramente con ${powerGap.toLocaleString()} puntos de ventaja.`;
        } else if (powerGap < 200) {
            insight = `⚖️ Meta equilibrado: Las manos están muy parejas. La flexibilidad será clave.`;
        } else {
            insight = `📊 Meta balanceado: ${top.name} lidera, pero hay varias opciones viables.`;
        }

        return {
            text: insight,
            averagePower: Math.round(averagePower),
            powerGap: powerGap,
            topHand: top.name,
            recommendations: BalatroPowerUtils.getMetaRecommendations(results)
        };
    }

    static getMetaRecommendations(results) {
        const recommendations = [];
        const top3 = results.slice(0, 3);

        // Recomendación principal
        recommendations.push({
            type: 'primary',
            title: 'Estrategia Principal',
            text: `Enfócate en ${top3[0].name}. Busca jokers y cartas que la potencien.`
        });

        // Recomendación de backup
        if (top3.length > 1) {
            const gap = top3[0].total - top3[1].total;
            if (gap < 300) {
                recommendations.push({
                    type: 'secondary',
                    title: 'Plan B Sólido',
                    text: `Mantén ${top3[1].name} como alternativa viable (solo ${gap} puntos de diferencia).`
                });
            }
        }

        // Análisis de diversidad
        const uniqueRanges = new Set();
        results.forEach(r => {
            if (r.total >= 800) uniqueRanges.add('high');
            else if (r.total >= 400) uniqueRanges.add('medium');
            else uniqueRanges.add('low');
        });

        if (uniqueRanges.size === 1) {
            recommendations.push({
                type: 'warning',
                title: 'Falta Diversidad',
                text: 'Todas tus manos están en un rango similar. Considera diversificar.'
            });
        }

        return recommendations;
    }

    static exportConfiguration(hands) {
        const config = {
            timestamp: new Date().toISOString(),
            version: '1.0.0',
            hands: {}
        };

        Object.entries(hands).forEach(([key, hand]) => {
            config.hands[key] = {
                name: hand.name,
                baseValue: hand.baseValue,
                multiplier: hand.multiplier,
                total: hand.baseValue * hand.multiplier
            };
        });

        return JSON.stringify(config, null, 2);
    }

    static importConfiguration(configJson) {
        try {
            const config = JSON.parse(configJson);
            if (!config.hands) throw new Error('Invalid configuration format');
            return config.hands;
        } catch (error) {
            console.error('Error importing configuration:', error);
            return null;
        }
    }

    static saveToLocalStorage(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
            return true;
        } catch (error) {
            console.error('Error saving to localStorage:', error);
            return false;
        }
    }

    static loadFromLocalStorage(key) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('Error loading from localStorage:', error);
            return null;
        }
    }

    static generateShareableURL(hands) {
        const params = new URLSearchParams();

        Object.entries(hands).forEach(([key, hand]) => {
            params.set(`${key}_base`, hand.baseValue);
            params.set(`${key}_mult`, hand.multiplier);
        });

        return `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    }

    static parseURLParams() {
        const params = new URLSearchParams(window.location.search);
        const config = {};

        for (const [key, value] of params) {
            if (key.endsWith('_base')) {
                const handKey = key.replace('_base', '');
                if (!config[handKey]) config[handKey] = {};
                config[handKey].baseValue = parseInt(value) || 0;
            } else if (key.endsWith('_mult')) {
                const handKey = key.replace('_mult', '');
                if (!config[handKey]) config[handKey] = {};
                config[handKey].multiplier = parseFloat(value) || 0;
            }
        }

        return Object.keys(config).length > 0 ? config : null;
    }

    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    static animateValue(element, start, end, duration) {
        let startTime = null;
        const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            element.textContent = BalatroPowerUtils.formatNumber(value);
            if (progress < 1) {
                requestAnimationFrame(step);
            }
        };
        requestAnimationFrame(step);
    }
}

// Extensiones para la clase principal
if (typeof BalatroPowerCalculator !== 'undefined') {
    // Añadir funciones de utilidad a la clase principal
    BalatroPowerCalculator.prototype.exportConfig = function () {
        const configString = BalatroPowerUtils.exportConfiguration(this.currentHands);

        // Crear blob y link de descarga
        const blob = new Blob([configString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = `balatro-config-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        this.showNotification('Configuración exportada exitosamente', 'success');
    };

    BalatroPowerCalculator.prototype.importConfig = function (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const config = BalatroPowerUtils.importConfiguration(e.target.result);
            if (config) {
                this.loadConfiguration(config);
                this.showNotification('Configuración importada exitosamente', 'success');
            } else {
                this.showNotification('Error al importar la configuración', 'error');
            }
        };
        reader.readAsText(file);
    };

    BalatroPowerCalculator.prototype.loadConfiguration = function (config) {
        Object.entries(config).forEach(([key, handConfig]) => {
            if (this.currentHands[key]) {
                const baseInput = document.getElementById(`base-${key}`);
                const multInput = document.getElementById(`mult-${key}`);

                if (baseInput) baseInput.value = handConfig.baseValue;
                if (multInput) multInput.value = handConfig.multiplier;

                this.updateHandCalculation(key);
            }
        });
    };

    BalatroPowerCalculator.prototype.showNotification = function (message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `alert alert-${type === 'error' ? 'danger' : type} alert-dismissible fade show position-fixed`;
        notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';

        notification.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            if (document.body.contains(notification)) {
                notification.classList.remove('show');
                setTimeout(() => {
                    if (document.body.contains(notification)) {
                        document.body.removeChild(notification);
                    }
                }, 150);
            }
        }, 4000);
    };

    BalatroPowerCalculator.prototype.shareConfiguration = function () {
        const shareableURL = BalatroPowerUtils.generateShareableURL(this.currentHands);

        if (navigator.share) {
            navigator.share({
                title: 'Mi configuración de Balatro',
                text: 'Mira mi configuración de manos de poker en Balatro',
                url: shareableURL
            });
        } else if (navigator.clipboard) {
            navigator.clipboard.writeText(shareableURL).then(() => {
                this.showNotification('URL copiada al portapapeles', 'success');
            });
        } else {
            prompt('Copia esta URL para compartir tu configuración:', shareableURL);
        }
    };
}

// Auto-cargar configuración desde URL al inicializar
document.addEventListener('DOMContentLoaded', function () {
    const urlConfig = BalatroPowerUtils.parseURLParams();
    if (urlConfig && window.calculator) {
        setTimeout(() => {
            calculator.loadConfiguration(urlConfig);
            calculator.showNotification('Configuración cargada desde URL', 'info');
        }, 500);
    }
});

// Exportar utilidades para uso global
window.BalatroPowerUtils = BalatroPowerUtils;