let dataToko = [];

function tambahToko(){
  let nama = namaToko.value;
  let harga = Number(hargaToko.value);
  if(!nama || !harga) return alert("Lengkapi data");

  dataToko.push({nama,harga});
  tabelToko.innerHTML = dataToko.map((t,i)=>`
    <tr>
      <td>${i+1}</td>
      <td>${t.nama}</td>
      <td>Rp ${t.harga}</td>
    </tr>
  `).join("");

  namaToko.value="";
  hargaToko.value="";
}

function hitungStatistik(){
  let barang = namaBarang.value;
  if(!barang || dataToko.length < 2) return alert("Minimal 2 toko");

  let harga = dataToko.map(t=>t.harga).sort((a,b)=>a-b);
  let mean = harga.reduce((a,b)=>a+b)/harga.length;
  let median = harga.length%2 ? harga[Math.floor(harga.length/2)] :
    (harga[harga.length/2-1]+harga[harga.length/2])/2;

  let freq={};
  harga.forEach(x=>freq[x]=(freq[x]||0)+1);
  let mode = Object.keys(freq).reduce((a,b)=>freq[a]>freq[b]?a:b);

  let murah = dataToko.reduce((m,t)=>t.harga<m.harga?t:m);

  localStorage.setItem("hasil", JSON.stringify({
    barang, mean, median, mode, murah
  }));

  window.location.href = "/result";
}

if(document.getElementById("output")){
  let h = JSON.parse(localStorage.getItem("hasil"));
  if(h){
    judulBarang.innerText = "Barang: " + h.barang;
    output.innerHTML = `
      <div class="stat-box"><h3>Mean</h3>Rp ${h.mean.toFixed(0)}</div>
      <div class="stat-box"><h3>Median</h3>Rp ${h.median}</div>
      <div class="stat-box"><h3>Modus</h3>Rp ${h.mode}</div>
      <div class="stat-box"><h3>Toko Termurah</h3>${h.murah.nama}<br><b>Rp ${h.murah.harga}</b></div>
    `;
  }
}
