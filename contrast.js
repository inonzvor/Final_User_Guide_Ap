function hexToRgb(hex) {
    const bigint = parseInt(hex.replace('#', ''), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return [r, g, b];
}

function luminance(r, g, b) {
    const a = [r, g, b].map(function (v) {
        v /= 255;
        return v <= 0.03928
            ? v / 12.92
            : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

function contrast(hex1, hex2) {
    const rgb1 = hexToRgb(hex1);
    const rgb2 = hexToRgb(hex2);
    const l1 = luminance(rgb1[0], rgb1[1], rgb1[2]);
    const l2 = luminance(rgb2[0], rgb2[1], rgb2[2]);
    const lightest = Math.max(l1, l2);
    const darkest = Math.min(l1, l2);
    return ((lightest + 0.05) / (darkest + 0.05)).toFixed(2);
}

const dark = {
    bg: '#03050f',
    surface: '#1c2736',
    ink: '#f1f5f9',
    inkSoft: '#94a3b8',
    accent: '#6a95cc',
    onAccent: '#03050f',
};

const light = {
    bg: '#e6f7f3',
    surface: '#ffffff',
    ink: '#0f172a',
    inkSoft: '#475569',
    accent: '#2b6cb0',
    onAccent: '#ffffff',
};

console.log("Dark Theme Ratios:");
console.log("ink on bg:", contrast(dark.ink, dark.bg));
console.log("ink on surface:", contrast(dark.ink, dark.surface));
console.log("inkSoft on surface:", contrast(dark.inkSoft, dark.surface));
console.log("accent on bg:", contrast(dark.accent, dark.bg));
console.log("accent on surface:", contrast(dark.accent, dark.surface));
console.log("onAccent on accent:", contrast(dark.onAccent, dark.accent));

console.log("\nLight Theme Ratios:");
console.log("ink on bg:", contrast(light.ink, light.bg));
console.log("ink on surface:", contrast(light.ink, light.surface));
console.log("inkSoft on surface:", contrast(light.inkSoft, light.surface));
console.log("accent on bg:", contrast(light.accent, light.bg));
console.log("accent on surface:", contrast(light.accent, light.surface));
console.log("onAccent on accent:", contrast(light.onAccent, light.accent));
