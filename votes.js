const fetch = require("node-fetch");
const converter = require('json-2-csv');
var fs = require('fs');

let max = 225;

let listar = new Promise((resolve, reject) => {
  let i = 0;
  let listagem = [];

  for (i; i < max; i++) {
    getCandidate(i).then(data => {
      listagem.push(data);

      if (listagem.length === max) {
        resolve(listagem);
      }
    });
  }
});

listar.then((listagem) => {
  let candidatos = [];

  listagem.forEach(registo => {
    if (registo.code === 200) {
      candidatos.push(registo.data.band);
    }
  });

  let finalData = candidatos.map(candidato => {
    return {
      id: candidato.id,
      name: candidato.name,
      votes: candidato.votes,
      status: candidato.status,
      image: candidato.image,
      nationality: candidato.nationality,
      city: candidato.city,
      email: candidato.email,
      phone: candidato.phone,
      alternative_name: candidato.alternative_name,
      video_url: candidato.video_url,
      badge: candidato.badge,
      slug: candidato.slug,
      winner: candidato.winner,
      final: candidato.final,
      bio: candidato.bio,
      members: candidato.members,
    }
  });

  save(finalData);
})

function getCandidate(id) {
  return new Promise((resolve) => {
    (async () => {
      const response = await fetch(`https://tantofado.eae.pt//api/show-band/${id}?lang=portugal`, {
        "headers": {
          "accept": "*/*",
          "accept-language": "en-US,en;q=0.9,pt-PT;q=0.8,pt;q=0.7",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "cross-site",
          "secret-token": "tokentest"
        },
        "referrerPolicy": "no-referrer-when-downgrade",
        "body": null,
        "method": "GET",
        "mode": "cors"
      });
      const body = await response.json();
      resolve(body);
    })();
  })
}

function save(data) {
  let json = JSON.stringify(data);
  let dir = "./files";

  if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
  }

  fs.writeFile(`${dir}/lista.json`, json, function (err) {
    if (err) throw err;
    console.log('Saved JSON!');
  });

  converter.json2csv(data, (err, csv) => {
    if (err) {
      throw err;
    }

    // print CSV string
    // console.log(csv);
    fs.writeFile(`${dir}/lista.csv`, csv, function (err) {
      if (err) throw err;
      console.log('Saved CSV!');
    });
  });
}