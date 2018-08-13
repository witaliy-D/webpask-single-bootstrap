function requireAll(r) {
    r.keys().forEach(r);
}

requireAll(require.context('../img/symbols/', true, /\.svg$/));
//requireAll(require.context('../img/svg-inline/', true, /\.svg$/));




