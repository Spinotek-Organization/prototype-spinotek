const fs = require('fs');

const html = fs.readFileSync('dlu_home.html', 'utf-8');

const locationMatch = html.match(/var location = JSON\.parse\('(.*?)'\);/);
const locationtoMatch = html.match(/var locationto = JSON\.parse\('(\[.*?\])'\);/);

if (locationMatch && locationtoMatch) {
    const locations = JSON.parse(locationMatch[1]);
    const routes = JSON.parse(locationtoMatch[1]);

    // Create an object of ports
    const ports = {};
    for (const [id, name] of Object.entries(locations)) {
        ports[id] = name.replace('\\/', '/');
    }

    // Create an object mapping each port ID to its available destination port IDs
    const destinationsByOrigin = {};
    for (const route of routes) {
        if (!destinationsByOrigin[route.idlocationfrom]) {
            destinationsByOrigin[route.idlocationfrom] = [];
        }
        destinationsByOrigin[route.idlocationfrom].push(route.idlocationto);
    }

    fs.writeFileSync('dlu_data.json', JSON.stringify({ ports, destinationsByOrigin }, null, 2));
    console.log('Successfully extracted DLU data to dlu_data.json');
} else {
    console.error('Could not find location data in HTML.');
}
