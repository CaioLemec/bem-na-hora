const map = L.map("mapid").setView([-23.5879824,-46.6616683], 14);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

/* Para autenticar :

http://api.olhovivo.sptrans.com.br/v2.1/Login/Autenticar?token=35779ce7c804e10322855a99110a9c1bf818aac328c3d591edb969f7972c4460

Authenticator: token=35779ce7c804e10322855a99110a9c1bf818aac328c3d591edb969f7972c4460

*/
