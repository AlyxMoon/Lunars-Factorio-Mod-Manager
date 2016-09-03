const messager = require('electron').ipcRenderer;

let installedMods;
let onlineMods;

let factorioVersion;

//---------------------------------------------------------
// Event listeners for client and server events

messager.on('dataInstalledMods', function(event, mods) {
    installedMods = mods;
    listInstalledMods();
});
messager.on('modsLoadedStatus', function(event, loaded, page, pageCount) {
    if(loaded) {
        messager.on('dataOnlineMods', function(event, mods) {
            onlineMods = mods;
            checkModVersions();
        });
        messager.send('requestOnlineMods');
    }

});

messager.on('dataFactorioVersion', function(event, version) {
    factorioVersion = version;
});

// Uses this way to assign events to elements as they will be dynamically generated
$(document).on('click', 'table#mods-list tbody tr', requestInstalledModInfo);

//---------------------------------------------------------
//---------------------------------------------------------
$(document).ready(function() {
    messager.send('requestFactorioVersion');
    messager.send('requestInstalledMods');

});

// Used as callback function
// One argument, an array of strings, representing the names of mods installed
function listInstalledMods() {
    let mods = installedMods;

    let table = $('table#mods-list');
    table.children().remove();

    table.append('<thead><tr class="bg-primary"><th colspan="2">All Installed Mods</th></tr></thead>');
    table.append('<tbody>');

    for(let i = 0; i < mods.length; i++) {
        table.append(`<tr id="${i}"><td>${mods[i].name}</td><td>${mods[i].version}</td></tr>`);
    }
    table.append('</tbody>');
}

// Will return the info pulled from the info.json file of the selected mod
function requestInstalledModInfo() {
    $('table#mods-list tbody tr').removeClass('info');
    $(this).addClass('info');

    showInstalledModInfo(installedMods[$(this).attr('id')]);
}

function showInstalledModInfo(mod) {
    let table = $('table#mod-info');
    table.children().remove();

    table.append(`<thead><tr class="bg-info"><th colspan="2">${mod['title']}</th></tr></thead>`);
    table.append('<tbody>');
    let tableBody = $('table#mod-info tbody');

    if(mod['version']) {
        tableBody.append(`<tr><td>Version</td><td>${mod['version']}</td></tr>`);
    }
    else {
        tableBody.append(`<tr><td>Version</td><td>Not found</td></tr>`);
    }

    if(mod['author']) {
        tableBody.append(`<tr><td>Author</td><td>${mod['author']}</td></tr>`);
    }
    else {
        tableBody.append(`<tr><td>Author</td><td>Not found</td></tr>`);
    }

    if(mod['contact']) {
        tableBody.append(`<tr><td>Contact</td><td>${mod['contact']}</td></tr>`);
    }
    else {
        tableBody.append(`<tr><td>Contact</td><td>Not included</td></tr>`);
    }
    if(mod['homepage']) {
        tableBody.append(`<tr><td>Homepage</td><td>${mod['homepage']}</td></tr>`);
    }
    else {
        tableBody.append(`<tr><td>Homepage</td><td>Not included</td></tr>`);
    }

    if(mod['factorio_version']) {
        tableBody.append(`<tr><td>Factorio Version</td><td>${mod['factorio_version']}</td></tr>`);
    }
    else {
        tableBody.append(`<tr><td>Factorio Version</td><td>Not found</td></tr>`);
    }

    if(mod['dependencies'] && mod['dependencies'].length > 0) {
        let dependencies = mod['dependencies'];
        tableBody.append(`<tr><td>Dependencies</td><td>${dependencies[0]}</td></tr>`);
        for(let i = 1; i < dependencies.length; i++) {
            tableBody.append(`<tr><td></td><td>${dependencies[i]}</td></tr>`);
        }
    }
    else {
        tableBody.append(`<tr><td>Dependencies</td><td>None specified</td></tr>`);
    }

    tableBody.append(`<tr><th class="center" colspan="2">Mod Description</th></tr>`);
    if(mod['description']) {
        tableBody.append(`<tr><td class="center" colspan="2">${mod['description']}</td></tr>`);
    }
    else {
        tableBody.append(`<tr><td class="center" colspan="2">No description found</td></tr>`);
    }

    tableBody.append('</tbody>');
}

function checkModVersions() {
    let updateIndicator = '<a href="#" id="playerInfo" data-toggle="tooltip" title="Newer version available for download"><i class="glyphicon glyphicon-info-sign"></i></a>';

    $('table#mods-list tbody').children().each(function(index) {
        let mod = $(this).children().first().text();
        let version = $(this).children().last().text();

        for(let i = 0; i < onlineMods.length; i++) {
            if(onlineMods[i].name === mod) {
                // Check if latest release is for same Factorio version and if a higher version available
                if( onlineMods[i].latest_release.factorio_version === factorioVersion &&
                    isVersionHigher(version, onlineMods[i].latest_release.version)) {

                    $(this).children().last().html(updateIndicator + `  <span>${version}</span>`);
                }
            }
        }
    });

    $(function () { $('[data-toggle="tooltip"]').tooltip() });
}

function isVersionHigher(currentVersion, checkedVersion) {
    // Expecting version to be the following format: major.minor.patch
    let version1 = currentVersion.split('.');
    let version2 = checkedVersion.split('.');

    for(i = 0; i < 3; i++) {
        let temp1 = parseInt(version1[i]), temp2 = parseInt(version2[i]);
        if(temp1 < temp2) return true;
        else if(temp1 > temp2) return false;
    }

    // Would be the same version at this point
    return false;
}