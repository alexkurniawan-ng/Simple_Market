// DATABASE


let dbUser = [
    {
        username: "admin", 
        email: "admin@gmail.com", 
        password: "admin", 
        role: "admin",
        order: []
    }, {
        username: "asdf", 
        email: "asdf@gmail.com", 
        password: "asdf", 
        role: "user",
        order: []
    }, {
        username: "alex", 
        email: "alex@gmail.com", 
        password: "asdf", 
        role: "user",
        order: []
    }
];

let dbTiket = [
    {
        idTiket: 1,
        tanggal: '2020-08-31',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/AirAsia_NewLogo.svg/1200px-AirAsia_NewLogo.svg.png',
        maskapai: 'Air Asia',
        asal: 'Jakarta',
        tujuan: 'Singapore',
        berangkat: '06:30',
        tiba: '07:30',
        kursi: 20,
        harga: 600000
    }, {
        idTiket: 2,
        tanggal: '2020-08-31',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/e/ea/LOGO_SJ_VERTIKAL.png',
        maskapai: 'Sriwijaya Air',
        asal: 'Jakarta',
        tujuan: 'Pontianak',
        berangkat: '12:30',
        tiba: '14:30',
        kursi: 50,
        harga: 1200000
    }, {        
        idTiket: 3,
        tanggal: '2020-08-31',
        logo: 'https://img2.pngdownload.id/20180816/ogy/kisspng-logo-garuda-indonesia-airline-flight-5b753dbf0201c2.8585218915344101750082.jpg',
        maskapai: 'Garuda Indonesia',
        asal: 'Pontianak',
        tujuan: 'Singapore',
        berangkat: '10:00',
        tiba: '10:30',
        kursi: 40,
        harga: 500000
    }, {        
        idTiket: 4,
        tanggal: '2020-09-01',
        logo: 'https://cdn.worldvectorlogo.com/logos/singapore-airlines.svg',
        maskapai: 'Singapore Airline',
        asal: 'Singapore',
        tujuan: 'Jakarta',
        berangkat: '19:00',
        tiba: '21:15',
        kursi: 70,
        harga: 1500000
    }, {        
        idTiket: 5,
        tanggal: '2020-09-01',
        logo: 'https://img2.pngdownload.id/20180905/pop/kisspng-batik-air-jakarta-logo-airplane-airline-5b9077f8952323.6709789015361945526109.jpg',
        maskapai: 'Batik Air',
        asal: 'Pontianak',
        tujuan: 'Jakarta',
        berangkat: '15:15',
        tiba: '16:45',
        kursi: 25,
        harga: 1100000
        }, {        
        idTiket: 6,
        tanggal: '2020-09-01',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/AirAsia_NewLogo.svg/1200px-AirAsia_NewLogo.svg.png',
        maskapai: 'Air Asia',
        asal: 'Jakarta',
        tujuan: 'Singapore',
        berangkat: '06:30',
        tiba: '07:30',
        kursi: 20,
        harga: 600000
    }, {
        idTiket: 7,
        tanggal: '2020-09-02',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/e/ea/LOGO_SJ_VERTIKAL.png',
        maskapai: 'Sriwijaya Air',
        asal: 'Jakarta',
        tujuan: 'Pontianak',
        berangkat: '12:30',
        tiba: '14:30',
        kursi: 50,
        harga: 1200000
    }, {        
        idTiket: 8,
        tanggal: '2020-09-02',
        logo: 'https://img2.pngdownload.id/20180816/ogy/kisspng-logo-garuda-indonesia-airline-flight-5b753dbf0201c2.8585218915344101750082.jpg',
        maskapai: 'Garuda Indonesia',
        asal: 'Pontianak',
        tujuan: 'Singapore',
        berangkat: '10:00',
        tiba: '10:30',
        kursi: 40,
        harga: 500000
    }, {        
        idTiket: 9,
        tanggal: '2020-09-02',
        logo: 'https://cdn.worldvectorlogo.com/logos/singapore-airlines.svg',
        maskapai: 'Singapore Airline',
        asal: 'Singapore',
        tujuan: 'Jakarta',
        berangkat: '19:00',
        tiba: '21:15',
        kursi: 70,
        harga: 1500000
    }, {        
        idTiket: 10,
        tanggal: '2020-09-02',
        logo: 'https://img2.pngdownload.id/20180905/pop/kisspng-batik-air-jakarta-logo-airplane-airline-5b9077f8952323.6709789015361945526109.jpg',
        maskapai: 'Batik Air',
        asal: 'Pontianak',
        tujuan: 'Jakarta',
        berangkat: '15:15',
        tiba: '16:45',
        kursi: 25,
        harga: 1100000
    }
];

let dbKeranjang = []
let totalBayar = 0;
let ticketSearched = []


// VARIABLE DECLARATION
let userLogin = null; //null


// MENU CONTROL
document.getElementById("registerPage").style.display = "none";
document.getElementById("loginPage").style.display = "none";
document.getElementById("addTicket-page").style.display = "none";
document.getElementById("ticket-page").style.display = "none";
document.getElementById("cart-page").style.display = "none";
document.getElementById("ticketFound").style.display = "none";
// document.getElementById("checkout-page").style.display = "none";

document.getElementById("btKeluar").disabled = true;


// CLASS INITIALIZATION
class DB_User {
    constructor(_username, _email, _password) {
        this.username = _username;
        this.email = _email;
        this.password = _password;
        this.role = "user"; //karena sudah pasti user, admin hanya 1 (e-commerce bukan marketplace)
        this.keranjang = []
    }
};

class Tiket {
    constructor(_idTiket, _tanggal, _logo, _maskapai, _asal, _tujuan, _berangkat, _tiba, _kursi, _harga) {
        this.idTiket = _idTiket;
        this.tanggal = _tanggal;
        this.logo = _logo;
        this.maskapai = _maskapai;
        this.asal = _asal;
        this.tujuan = _tujuan;
        this.berangkat = _berangkat;
        this.tiba = _tiba;
        this.kursi = _kursi;
        this.harga = _harga;
    }
};

class DB_Keranjang {
    constructor(_id, _tanggal, _logo, _maskapai, _asal, _tujuan, _berangkat, _tiba, _qty, _price) {
        this.id = _id;
        this.tanggal = _tanggal;
        this.logo = _logo;
        this.maskapai = _maskapai;
        this.asal = _asal;
        this.tujuan = _tujuan;
        this.berangkat = _berangkat;
        this.tiba = _tiba;
        this.qty = _qty;
        this.price = _price;
        this.priceTotal = _price * _qty;
    }
}


// MAIN MENU
btMenu = (menu) => {
    if (menu == "regis") {
        document.getElementById("registerPage").style.display = "block";
        document.getElementById("loginPage").style.display = "none";
    } else if (menu == "login") {
        document.getElementById("loginPage").style.display = "block";
        document.getElementById("registerPage").style.display = "none";
        document.getElementById("loginName").style.display = "inline";
        document.getElementById("loginPass").style.display = "inline";
        document.getElementById("btMasuk").style.display = "inline";
    }
}

btRegis = () => {
    let form = document.getElementById("formRegister");
    let checkUserName = dbUser.filter((item, index) => {
        let inputUserName = form.elements[0].value.toLowerCase();
        let itemLower = item.username.toLowerCase();
        return itemLower.includes(inputUserName)
    });


    if (form.elements[0].value == '' || form.elements[1].value == '' || form.elements[2].value == '') {
        alert("Mohon lengkapi seluruh form");
    } else if (checkUserName != '') {
        alert(`Username ${form.elements[0].value} sudah terpakai`);
    } else if (!form.elements[1].value.includes('@')) {
        alert("Format Email Salah");
    } else if (form.elements[2].value.length < 4) {
        alert("Password minimal 4 angka/huruf");
    } else {
        dbUser.push(new DB_User(form.elements[0].value, form.elements[1].value, form.elements[2].value));
        document.getElementById("menuAwal").style.display = "none";
        document.getElementById("registerPage").style.display = "none";
        userLogin = dbUser.length - 1
        document.getElementById("ticket-page").style.display = "block";
        document.getElementById("ticketFound").style.display = "none";
        document.getElementById("btMasuk").disabled = true;
        document.getElementById("btKeluar").disabled = false;
        document.getElementById("loginPage").style.display = "block";
        document.getElementById("welcomeUser").style.display = "block";
        document.getElementById("welcomeUser").innerHTML = `Welcome, ${dbUser[userLogin].username}!`;
    }
    console.table(dbUser)
}

btLogin = () => {
    let getUsername = document.getElementById("loginName").value;
    let getPassword = document.getElementById("loginPass").value;

    if (getUsername == '' || getPassword == ''){
        alert("Mohon lengkapi seluruh form");
    } else {
        dbUser.forEach((item, index) => {
            if(item.username == getUsername && item.password == getPassword) {
                userLogin = index
                // console.log(index)
                // alert(`Selamat datang ${item.username}!`)
            } 
        })
        
        if (userLogin != null) {
            if(dbUser[userLogin].role == "admin"){
                // alert("kamu admin");
                document.getElementById("addTicket-page").style.display = "block";
                document.getElementById("ticket-page").style.display = "block";
                document.getElementById("ticketFound").style.display = "block";
                document.getElementById("btMasuk").disabled = true;
                document.getElementById("btKeluar").disabled = false;
                document.getElementById("loginName").style.display = "none";
                document.getElementById("loginPass").style.display = "none";
                document.getElementById("btMasuk").style.display = "none";
                printDataTiket(null, dbTiket);
            } else if (dbUser[userLogin].role == "user"){
                // alert("kamu user");
                document.getElementById("ticket-page").style.display = "block";
                document.getElementById("btMasuk").disabled = true;
                document.getElementById("btKeluar").disabled = false;
                document.getElementById("loginName").style.display = "none";
                document.getElementById("loginPass").style.display = "none";
                document.getElementById("btMasuk").style.display = "none";
                
                printDataTiket();
                if (dbUser[userLogin].order.length != 0) {
                    document.getElementById("cart-page").style.display = "block";
                }
            }
        } else {
            alert("Akun Belum Terdaftar")
        }
    }
    document.getElementById("menuAwal").style.display = "none";
    document.getElementById("welcomeUser").style.display = "block";
    document.getElementById("welcomeUser").innerHTML = `Welcome, ${dbUser[userLogin].username}!`;
}


///////////// PRINTING DATA ////////////////////
printDataTiket = (idx, data = ticketSearched) => {
    let tableElement = '';
    
    data.forEach((item, index) => {
        if (index == idx) {
            tableElement += 
                `<tr>
                    <td>${index + 1}</td>
                    <td><input type="text" id="newLogo${index}" value="${item.logo}"></td>
                    <td><input type="text" id="newMaskapai${index}" value="${item.maskapai}"></td>
                    <td><input type="text" id="newTanggal${index}" value="${item.tanggal}"></td>
                    <td><input type="text" id="newAsal${index}" value="${item.asal}"></td>
                    <td><input type="text" id="newTujuan${index}" value="${item.tujuan}"></td>
                    <td><input type="text" id="newBerangkat${index}" value="${item.berangkat}"></td>
                    <td><input type="text" id="newTiba${index}" value="${item.tiba}"></td>
                    <td><input type="number" style="width: 100px" id="newKursi${index}" value="${item.kursi}"></td>
                    <td><input type="number" id="newHargaTiket${index}" value="${item.harga}"></td>
                    <td><button type="button" onclick="saveProduk(${index})">Save</button><button type="button" onclick='printDataTiket()'>Cancel</button></td>
                </tr>`

        } else {
            tableElement += 
            `<tr>
            <td>${index + 1}</td>
            <td>${item.tanggal}</td>
            <td><img src="${item.logo}" height="80px"></td>
            <td>${item.maskapai}</td>
            <td>${item.asal}</td>
            <td>${item.tujuan}</td>
            <td>${item.berangkat}</td>
            <td>${item.tiba}</td>
            <td>${item.kursi}</td>
            <td>${item.harga.toLocaleString()}</td>
            <td>
            ${
                dbUser[userLogin].role == "user" ?
                `<button type="button" onclick='addCart(${index})'>Add to Cart 🛒</button>` 
                :
                `<button type="button" onclick='editProduk(${index})'>Edit ⚙</button> <button type="button" onclick='deleteProduk(${index})'>Delete 🗑</button>`
            }
            </td>
        </tr>`
        }
        document.getElementById("listTiket").innerHTML = tableElement;
        console.table(dbTiket)
    })
};
// printDataTiket();

printDataCart = () => {
    let tableElementCart = '';

    dbUser[userLogin].order.forEach((item, index) => {
        tableElementCart += `
        <tr>
            <td>${index + 1}</td>
            <td>${item.tanggal}</td>
            <td><img src="${item.logo}" height="80px"></td>
            <td>${item.maskapai}</td>
            <td>${item.asal}</td>
            <td>${item.tujuan}</td>
            <td>${item.berangkat}</td>
            <td>${item.tiba}</td>
            <td>${item.qty}</td>
            <td>${item.price.toLocaleString()}</td>
            <td>${item.priceTotal.toLocaleString()}</td>
            <td><button type='button' onclick='editCart(${index})'>Edit Qty ⚙</button> <button type='button' onclick='deleteCart(${index})'>Delete 🗑</button></td>
        </tr>`
        })
        // tableElementCart += `<button type="button" onclick="checkout()">Checkout</button?>`

        document.getElementById("listOrder").innerHTML = tableElementCart;
    
        totalBayar = 0;
        dbUser[userLogin].order.forEach((item, index) => {
            totalBayar += item.priceTotal
        })

        document.getElementById("payment-page").innerHTML = 'Payment: ' + totalBayar.toLocaleString();
    } 

    
/////////// A D M I N   F U N C T I O N ////////////
btAddTiket = () => {
    let form = document.getElementById("formTicket");
    let tanggal = form.elements[0].value; //cara lain: document.getElementById('namaProduk').value;
    let logo = '';
    let maskapai = form.elements[1].value;
    let asal = form.elements[2].value;
    let tujuan = form.elements[3].value;
    let berangkat = form.elements[4].value;
    let tiba = form.elements[5].value;
    let kursi = form.elements[6].value;
    let harga = parseInt(form.elements[7].value) * 1000;
    
    if (maskapai == 'Air Asia') {
        logo = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/AirAsia_NewLogo.svg/1200px-AirAsia_NewLogo.svg.png'
    } else if (maskapai == 'Sriwijaya Air') {
        logo = 'https://upload.wikimedia.org/wikipedia/commons/e/ea/LOGO_SJ_VERTIKAL.png'
    } else if (maskapai == 'Garuda Indonesia') {
        logo = 'https://img2.pngdownload.id/20180816/ogy/kisspng-logo-garuda-indonesia-airline-flight-5b753dbf0201c2.8585218915344101750082.jpg'
    } else if (maskapai == 'Singapore Airline') {
        logo = 'https://cdn.worldvectorlogo.com/logos/singapore-airlines.svg'
    } else if (maskapai == 'Batik Air') {
        logo = 'https://img2.pngdownload.id/20180905/pop/kisspng-batik-air-jakarta-logo-airplane-airline-5b9077f8952323.6709789015361945526109.jpg'
    }

    if (tanggal == '' || maskapai == '' || asal == '' || tujuan == '' || berangkat == '' || tiba == '' || kursi == 0 || harga == 0) {
        alert('Lengkapi semua form');
    } else {
        dbTiket.push(new Tiket(dbTiket.length + 1, tanggal, logo, maskapai, asal, tujuan, berangkat, tiba, kursi, harga))
    }
    printDataTiket(null, dbTiket);
    searchDate();
}

editProduk = (index) => {
    printDataTiket(index);
};

deleteProduk = (index) => {
    dbTiket.splice(index, 1);
    printDataTicket();
    console.table(dbTiket)
}

saveProduk = (index) => {
    dbTiket[index].tanggal = document.getElementById(`newTanggal${index}`).value;
    dbTiket[index].logo = document.getElementById(`newLogo${index}`).value;
    dbTiket[index].maskapai = document.getElementById(`newMaskapai${index}`).value;
    dbTiket[index].asal = document.getElementById(`newAsal${index}`).value;
    dbTiket[index].tujuan = document.getElementById(`newTujuan${index}`).value;
    dbTiket[index].berangkat = document.getElementById(`newBerangkat${index}`).value;
    dbTiket[index].tiba = document.getElementById(`newTiba${index}`).value;
    dbTiket[index].kursi = parseInt(document.getElementById(`newKursi${index}`).value);
    dbTiket[index].harga = parseInt(document.getElementById(`newHargaTiket${index}`).value);

    printDataTiket();
}


/////////// U S E R      F U N C T I O N ////////////
btKeluar = () => {
    userLogin = null;
    document.getElementById("btKeluar").disabled = true;
    document.getElementById("btMasuk").disabled = false;
    document.getElementById("ticket-page").style.display = "none";
    document.getElementById("cart-page").style.display = "none";
    document.getElementById("addTicket-page").style.display = "none";
    document.getElementById("loginPage").style.display = "none";
    document.getElementById("registerPage").style.display = "none";
    document.getElementById("menuAwal").style.display = "block";
    document.getElementById("welcomeUser").style.display = "none";
}

addCart = (index) => {
    let qtyTiket = parseInt(prompt("Berapa banyak ticket yang ingin Anda beli?"));
    dbUser[userLogin].order.push(new DB_Keranjang(ticketSearched[index].idTiket, ticketSearched[index].tanggal, ticketSearched[index].logo, ticketSearched[index].maskapai, ticketSearched[index].asal, ticketSearched[index].tujuan, ticketSearched[index].berangkat, ticketSearched[index].tiba, qtyTiket, ticketSearched[index].harga));
    document.getElementById("cart-page").style.display = "block";
    // document.getElementById("checkout-page").style.display = "block";
    ticketSearched[index].kursi -= qtyTiket
    printDataCart()
    printDataTiket();
    console.table(dbUser.order)
}

editCart = (index) => {
    let noProduk = dbTiket.findIndex((item) => item.idTiket == dbUser[userLogin].order[index].id)
    let qtyTiket = parseInt(prompt("Edit Jumlah jadi berapa?"));
    dbTiket[noProduk].kursi -= (qtyTiket - dbUser[userLogin].order[index].qty)
    dbUser[userLogin].order[index].qty = qtyTiket
    dbUser[userLogin].order[index].priceTotal = dbUser[userLogin].order[index].price * qtyTiket
    printDataCart()
    printDataTiket();
}

deleteCart = (index) => {
    let noProduk = dbTiket.findIndex((item) => item.idTiket == dbUser[userLogin].order[index].id)
    dbTiket[noProduk].kursi += dbUser[userLogin].order[index].qty
    dbUser[userLogin].order.splice(index, 1);
    printDataCart()
    printDataTiket();
    if (dbUser[userLogin].order.length == 0) {
        document.getElementById("cart-page").style.display = "none";
    }
}

bayar = () => {
    while (true) {
        let uangPembayaran = parseInt(prompt("Berapa Uang Pembayaran Anda?"));
        if (uangPembayaran < totalBayar) {
            alert("Uang Anda tidak Cukup")
        } else {
            alert(`Kembalian Anda: ${uangPembayaran - totalBayar}. Terima kasih.`)
            dbUser[userLogin].keranjang = []
            printDataCart()
            document.getElementById("cart-page").style.display = "none";
            break
        }
    }
}

//////////////// S E A R C H ,   F I L T E R    &    S O R T //////////////////////
// SEARCH FUNCTION
// searchText = () => {
//     let inputSearch = document.getElementById("searchText").value;
//     let filterSearch = dbTiket.filter((item, index) => {
//         let itemLower = item.maskapai.toLocaleLowerCase() + item.asal.toLocaleLowerCase() + item.tujuan.toLocaleLowerCase();
//         let inputLower = inputSearch.toLowerCase();
//         return itemLower.includes(inputLower)
//     })
//     printDataTiket(null, filterSearch);
// }

searchDate = () => {
    let inputSearch = document.getElementById("searchDate").value;
    ticketSearched = dbTiket.filter((item, index) => {
        let itemLower = item.tanggal;
        let inputLower = inputSearch;
        return itemLower.includes(inputLower)
    })

    if (ticketSearched.length != 0) {
        printDataTiket(null, ticketSearched);
        document.getElementById("ticketFound").style.display = "block";
    } else {
        document.getElementById("ticketFound").style.display = "none";
    }
}

// FILTER FUNCTION
filterHarga = () => {
    let inputHargaMin= document.getElementById("hargaMin").value;
    let inputHargaMax = document.getElementById("hargaMax").value;

    let filterSearch = dbTiket.filter((item, index) => {
        return (item.harga >= inputHargaMin && item.harga <= inputHargaMax)
    })
    printDataTiket(null, filterSearch);
}

filterStock = () => {
    let inputStockMin= document.getElementById("hargaMin").value;
    let inputStockMax = document.getElementById("hargaMax").value;

    let filterSearch = dbTiket.filter((item, index) => {
        return (item.stock >= inputStockMin && item.stock <= inputStockMax)
    })
    printDataTiket(null, filterSearch);
}

resetFilter = () => {
    printDataTiket();
}


//SORT FUNCTION
sortNama = () => {
    sortData = document.getElementById("whatsort").value;
    let sortNama = dbTiket.sort((a, b) => {
        if (a.maskapai < b.maskapai) {return sortData == "ASC" ? -1 : 1};
        if (a.maskapai > b.maskapai) {return sortData == "ASC" ? 1 : -1};
        return 0;
    });
    printDataTiket(null, sortNama)
}

sortStock = () => {
    sortData = document.getElementById("whatsort").value;
    let sortStock = dbTiket.sort((a, b) => {
        if (a.kursi < b.kursi) {return sortData == "ASC" ? -1 : 1};
        if (a.kursi > b.kursi) {return sortData == "ASC" ? 1 : -1};
        return 0;
    });
    printDataTiket(null, sortStock)
}

sortHarga = () => {
    sortData = document.getElementById("whatsort").value;
    let sortHarga = dbTiket.sort((a, b) => {
        if (a.harga < b.harga) {return sortData == "ASC" ? -1 : 1};
        if (a.harga > b.harga) {return sortData == "ASC" ? 1 : -1};
        return 0;
    });
    printDataTiket(null, sortHarga)
}


tanggal = () => {
    let tanggal = document.getElementById("jamBerangkat").value
    console.log(tanggal)
}
