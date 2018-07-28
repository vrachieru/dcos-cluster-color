function isUiRendered() {
    return !!document.querySelector('[data-reactroot], [data-reactid]');
}

function setClusterColor() {
    var clusterColorMappings = { 'preprod': '#f9a328', 'prod': '#d42534', 'test': '#157ff2', 'dev': '#12b277' }

    var clusterName = document.querySelector('.sidebar .header-title').textContent
    var clusterId = Object.keys(clusterColorMappings)
        .filter(cluster => clusterName.includes(cluster))
        .shift()

    document.querySelector('head').append(function() {
        var style = document.createElement('style');
        style.textContent = `
            ul.sidebar-menu li.selected.open>a, ul.sidebar-menu li.selected.open>a:active, ul.sidebar-menu li.selected.open>a:hover, ul.sidebar-menu li.selected:not(.open), ul.sidebar-menu li.selected>a, ul.sidebar-menu li.selected>a:active, ul.sidebar-menu li.selected>a:hover { 
                background: ${clusterColorMappings[clusterId]}
            };
        `;
        return style;
    }())

    return true;
}

function rainbow(attempt = 0) {
  isUiRendered() 
    && setClusterColor()
    || (attempt < 100 && setTimeout(rainbow, 250, attempt++));
}

rainbow();