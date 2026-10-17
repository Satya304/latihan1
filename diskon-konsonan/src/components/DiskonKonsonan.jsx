
import { useState } from "react";
import "./DiskonKonsonan.css";

function DiskonKonsonan() {
  const [harga, setHarga] = useState("");
  const [nama, setNama] = useState("");
  const [hasil, setHasil] = useState(null);

  function hitungDiskon(e) {
    e.preventDefault();

    const namaBersih = nama.trim().toLowerCase();
    const totalHarga = Number(harga);

    if (!namaBersih || harga === "" || !Number.isFinite(totalHarga) || totalHarga < 0) {
      alert("Masukkan nama dan total harga yang valid!");
      return;
    }

    const konsonan = namaBersih.match(/[b-df-hj-np-tv-z]/g) || [];
    const jumlahKonsonan = konsonan.length;
    const jumlahKata = namaBersih.split(/\s+/).length;

    let diskon = jumlahKonsonan * 2;

    if (jumlahKata > 2) {
      diskon += 5;
    }

    diskon = Math.min(diskon, 20);

    const potongan = totalHarga * diskon / 100;
    const hargaAkhir = totalHarga - potongan;

    setHasil({
      jumlahKonsonan,
      jumlahKata,
      diskon,
      potongan,
      hargaAkhir,
    });
  }

  const rupiah = (angka) =>
    angka.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    });

  return (
    <div className="diskon-container">
      <h1>Program Diskon Huruf Konsonan</h1>

      <form onSubmit={hitungDiskon}>
        <label>Total Harga Pembelian (Rp)</label>
        <input
          type="number"
          min="0"
          value={harga}
          onChange={(e) => setHarga(e.target.value)}
          placeholder="Masukkan total harga"
          required
        />

        <label>Nama Pelanggan</label>
        <input
          type="text"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          placeholder="Masukkan nama pelanggan"
          required
        />

        <button type="submit">Hitung Diskon</button>
      </form>

      {hasil && (
        <div className="diskon-result">
          <h2>Hasil Perhitungan</h2>
          <p>Jumlah Huruf Konsonan: {hasil.jumlahKonsonan}</p>
          <p>Jumlah Kata: {hasil.jumlahKata}</p>
          <p>Persentase Diskon: {hasil.diskon}%</p>
          <p>Total Potongan Harga: {rupiah(hasil.potongan)}</p>
          <p>Harga Pembelian Setelah Diskon: {rupiah(hasil.hargaAkhir)}</p>
        </div>
      )}
    </div>
  );
}

export default DiskonKonsonan;
