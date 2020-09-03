// DATABASE
let dbUser = [
    {
        username: "admin", 
        email: "admin@gmail.com", 
        password: "admin", 
        role: "admin",
        keranjang: []
    }, {
        username: "asdf", 
        email: "asdf@gmail.com", 
        password: "asdf", 
        role: "user",
        keranjang: []
    }, {
        username: "alex", 
        email: "alex@gmail.com", 
        password: "asdf", 
        role: "user",
        keranjang: []
    }
];

let dbProduk = [
    {
        idProduk: 1,
        nama: 'Tas Travel Rolltop No.322',
        foto: 'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//91/MTA-3844404/nama_rolltop-backpack-nama-lite-322---original-namastudios---_full16.jpg?output-format=webp',
        desk: 'Tas Ransel dari Nama Studio, Trendy, Bagasi Luas, YKK Hardware',
        stock: 20,
        harga: 150000
    }, {
        idProduk: 2,
        nama: 'Tas Pinggang Waist Bag No.150',
        foto: 'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//96/MTA-3935616/nama_nama_lite_waist_bag_pria_-original-_150-_full16.jpg?output-format=webp',
        desk: 'Tas Waist Bag dari Nama Studio, Trendy, Bagasi Luas, YKK Hardware',
        stock: 45,
        harga: 99000
    }, {        
        idProduk: 3,
        nama: 'Tas Slempang Compact No.200',
        foto: 'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//104/MTA-4288946/nama_nama_studios_lite_200_sling_bag_tas_selempang_pria_-_hitam_full04_p4rohlme.jpg?output-format=webp',
        desk: 'Tas Slempang dari Nama Studio, Trendy, Bagasi Luas, YKK Hardware',
        stock: 32,
        harga: 80000
    }
];

let dbKeranjang = []
let totalBayar = 0;


// VARIABLE DECLARATION
let userLogin = null; //null


// MENU CONTROL
document.getElementById("registerPage").style.display = "none";
document.getElementById("loginPage").style.display = "none";
document.getElementById("addProduct-page").style.display = "none";
document.getElementById("product-page").style.display = "none";
document.getElementById("cart-page").style.display = "none";
// document.getElementById("checkout-page").style.display = "none";

document.getElementById("btKeluar").disabled = true;


// CLASS DELCARATION
class DB_User {
    constructor(_username, _email, _password) {
        this.username = _username;
        this.email = _email;
        this.password = _password;
        this.role = "user"; //karena sudah pasti user, admin hanya 1 (e-commerce bukan marketplace)
        this.keranjang = []
    }
};

class Produk {
    constructor(_idProduk, _nama, _foto, _desk, _stock, _harga) {
        this.idProduk = _idProduk;
        this.nama = _nama;
        this.foto = _foto;
        this.desk = _desk;
        this.stock = _stock;
        this.harga = _harga;
    }
};

class DB_Keranjang {
    constructor(_id, _namaProduk, _foto, _qty, _price) {
        this.id = _id;
        this.namaProduk = _namaProduk;
        this.foto = _foto;
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
    }
    console.table(dbUser)
}

btLogin = () => {
    let getUsername = document.getElementById("loginName").value;
    let getPassword = document.getElementById("loginPass").value;
    // console.log("btlogin", getUsername, getPassword)

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
                document.getElementById("addProduct-page").style.display = "block";
                document.getElementById("product-page").style.display = "block";
                document.getElementById("btMasuk").disabled = true;
                document.getElementById("btKeluar").disabled = false;
                printDataProduk();
            } else if (dbUser[userLogin].role == "user"){
                // alert("kamu user");
                document.getElementById("product-page").style.display = "block";
                document.getElementById("btMasuk").disabled = true;
                document.getElementById("btKeluar").disabled = false;
                printDataProduk();
                if (dbUser[userLogin].keranjang.length != 0) {
                    printDataCart()
                    document.getElementById("cart-page").style.display = "block";
                }
            }
        } else {
            alert("Akun Belum Terdaftar")
        }
    }
}


// PRINTING DATA
printDataProduk = (idx, data = dbProduk) => {
    let tableElement = '';
    
    data.forEach((item, index) => {
        if (index == idx) {
            tableElement += 
                `<tr>
                    <td>${index + 1}</td>
                    <td><input type="text" id="newFotoProduk${index}" value="${item.foto}"></td>
                    <td><input type="text" id="newNamaProduk${index}" value="${item.nama}"></td>
                    <td><input type="text" id="newDeskProduk${index}" value="${item.nama}"></td>
                    <td><input type="number" style="width: 100px" id="newStockProduk${index}" value="${item.stock}"></td>
                    <td><input type="number" id="newHargaProduk${index}" value="${item.harga.toLocaleString()}"></td>
                    <td><button type="button" onclick="saveProduk(${index})">Save</button><button type="button" onclick='printDataProduk()'>Cancel</button></td>
                </tr>`

        } else {
            tableElement += 
            `<tr>
            <td>${index + 1}</td>
            <td><img src="${item.foto}" height="80px"></td>
            <td>${item.nama}</td>
            <td>${item.desk}</td>
            <td>${item.stock}</td>
            <td>${item.harga.toLocaleString()}</td>
            <td>
            ${
                dbUser[userLogin].role == "user" ?
                `<button type="button" onclick='addCart(${index})'>Cart 🛒 + 1</button><button type="button" onclick='addCartBulk(${index})'>Cart 🛒 + Bulk</button>` 
                :
                `<button type="button" onclick='editProduk(${index})'>Edit</button><button type="button" onclick='deleteProduk(${index})'>Delete</button>`
            }
            </td>
        </tr>`
        }
        document.getElementById("listProduk").innerHTML = tableElement;
        // console.table(dbProduk)
    })
};
// printDataProduk();

printDataCart = () => {
    let tableElementCart = '';

    dbUser[userLogin].keranjang.forEach((item, index) => {
        tableElementCart += `
        <tr>
            <td>${index + 1}</td>
            <td><img src="${item.foto}" height="80px"/></td>
            <td>${item.namaProduk}</td>
            <td>${item.qty}</td>
            <td>${item.price.toLocaleString()}</td>
            <td>${item.priceTotal.toLocaleString()}</td>
            <td><button type='button' onclick='editCart(${index})'>Edit Qty ⚙</button> <button type='button' onclick='deleteCart(${index})'>Delete 🗑</button></td>
        </tr>`
        })

        document.getElementById("listKeranjang").innerHTML = tableElementCart;
    
        totalBayar = 0;
        dbUser[userLogin].keranjang.forEach((item, index) => {
            totalBayar += item.priceTotal
        })

        document.getElementById("payment-page").innerHTML = 'Payment: ' + totalBayar.toLocaleString();
    } 

    
/////////// A D M I N      F U N C T I O N ////////////
btAddProduk = () => {
    let form = document.getElementById("formProduk");
    let nama = form.elements[0].value; //cara lain: document.getElementById('namaProduk').value;
    let foto = form.elements[1].value;
    let desk = form.elements[2].value;
    let stock = form.elements[3].value;
    let harga = form.elements[4].value;

    if (nama.value == '' || foto.value == '' || desk.value == '' || stock.value == 0 || harga.value == 0) {
        alert('Lengkapi semua form');
    } else {
        dbProduk.push(new Produk(dbProduk.length + 1, nama, foto, desk, stock, harga))
    }
    printDataProduk();
    console.table(dbProduk)
}

editProduk = (index) => {
    printDataProduk(index);
};

deleteProduk = (index) => {
    dbProduk.splice(index, 1);
    printDataProduk();
    // console.table(dbProduk)
}

saveProduk = (index) => {
    dbProduk[index].nama = document.getElementById(`newNamaProduk${index}`).value;
    dbProduk[index].foto = document.getElementById(`newFotoProduk${index}`).value;
    dbProduk[index].desk = document.getElementById(`newDeskProduk${index}`).value;
    dbProduk[index].stock = parseInt(document.getElementById(`newStockProduk${index}`).value);
    dbProduk[index].harga = parseInt(document.getElementById(`newHargaProduk${index}`).value);

    printDataProduk();
}


/////////// U S E R      F U N C T I O N ////////////
btKeluar = () => {
    userLogin = null;
    document.getElementById("btKeluar").disabled = true;
    document.getElementById("btMasuk").disabled = false;
    document.getElementById("product-page").style.display = "none";
    document.getElementById("cart-page").style.display = "none";
    document.getElementById("addProduct-page").style.display = "none";
}

//MENAMBAH 1
addCart = (index) => {
    let qtyProduk = 1;
    let noProduk = dbUser[userLogin].keranjang.findIndex((item) => item.id == dbProduk[index].idProduk)
    
    if (noProduk == -1) {
        dbUser[userLogin].keranjang.push(new DB_Keranjang(dbProduk[index].idProduk, dbProduk[index].nama, dbProduk[index].foto, qtyProduk, dbProduk[index].harga));
        document.getElementById("cart-page").style.display = "block";
        dbProduk[index].stock -= qtyProduk
    } else {
        userCart = dbUser[userLogin].keranjang[noProduk]
        userCart.qty++
        userCart.priceTotal = userCart.qty * userCart.price 
        dbProduk[index].stock -= qtyProduk
    }
    printDataCart()
    printDataProduk();
    console.table(dbUser[userLogin].keranjang)
    // console.log('cek: ' + noProduk)
}

//PROMPT JUMLAH
addCartBulk = (index) => {
    let qtyProduk = parseInt(prompt('Jumlah Produk yang ingin Anda beli?'));
    let noProduk = dbUser[userLogin].keranjang.findIndex((item) => item.id == dbProduk[index].idProduk)
    if (noProduk == -1) {
        dbUser[userLogin].keranjang.push(new DB_Keranjang(dbProduk[index].idProduk, dbProduk[index].nama, dbProduk[index].foto, qtyProduk, dbProduk[index].harga));
        document.getElementById("cart-page").style.display = "block";
        dbProduk[index].stock -= qtyProduk
    } else {
        userCart = dbUser[userLogin].keranjang[noProduk]
        userCart.qty += qtyProduk
        userCart.priceTotal = userCart.qty * userCart.price 
        dbProduk[index].stock -= qtyProduk
    }

    // dbUser[userLogin].keranjang.push(new DB_Keranjang(dbProduk[index].idProduk, dbProduk[index].nama, dbProduk[index].foto, qtyProduk, dbProduk[index].harga));
    // document.getElementById("cart-page").style.display = "block";
    // dbProduk[index].stock -= qtyProduk
    printDataCart()
    printDataProduk();

    // console.table(dbUser.keranjang)
    // console.log(indexProduct)
}


editCart = (index) => {
    let noProduk = dbProduk.findIndex((item) => item.idProduk == dbUser[userLogin].keranjang[index].id)
    let qtyProduk = parseInt(prompt("Edit Jumlah jadi berapa?"));
    dbProduk[noProduk].stock -= (qtyProduk - dbUser[userLogin].keranjang[index].qty)
    dbUser[userLogin].keranjang[index].qty = qtyProduk
    dbUser[userLogin].keranjang[index].priceTotal = dbUser[userLogin].keranjang[index].price * qtyProduk
    printDataCart()
    printDataProduk();
}

deleteCart = (index) => {
    let noProduk = dbProduk.findIndex((item) => item.idProduk == dbUser[userLogin].keranjang[index].id)
    dbProduk[noProduk].stock += dbUser[userLogin].keranjang[index].qty
    dbUser[userLogin].keranjang.splice(index, 1);
    printDataCart()
    printDataProduk();
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
searchText = () => {
    let inputSearch = document.getElementById("searchText").value;
    let filterSearch = dbProduk.filter((item, index) => {
        let itemLower = item.nama.toLocaleLowerCase() + item.desk.toLocaleLowerCase();
        let inputLower = inputSearch.toLowerCase();
        return itemLower.includes(inputLower)
    })
    printDataProduk(null, filterSearch);
}

// FILTER FUNCTION
filterHarga = () => {
    let inputHargaMin= document.getElementById("hargaMin").value;
    let inputHargaMax = document.getElementById("hargaMax").value;

    let filterSearch = dbProduk.filter((item, index) => {
        return (item.harga >= inputHargaMin && item.harga <= inputHargaMax)
    })
    printDataProduk(null, filterSearch);
}

filterStock = () => {
    let inputStockMin= document.getElementById("hargaMin").value;
    let inputStockMax = document.getElementById("hargaMax").value;

    let filterSearch = dbProduk.filter((item, index) => {
        return (item.stock >= inputStockMin && item.stock <= inputStockMax)
    })
    printDataProduk(null, filterSearch);
}

resetFilter = () => {
    printDataProduk();
}


//SORT FUNCTION
sortNama = () => {
    sortData = document.getElementById("whatsort").value;
    let sortNama = dbProduk.sort((a, b) => {
        if (a.nama < b.nama) {return sortData == "ASC" ? -1 : 1};
        if (a.nama > b.nama) {return sortData == "ASC" ? 1 : -1};
        return 0;
    });
    printDataProduk(null, sortNama)
}

sortStock = () => {
    sortData = document.getElementById("whatsort").value;
    let sortStock = dbProduk.sort((a, b) => {
        if (a.stock < b.stock) {return sortData == "ASC" ? -1 : 1};
        if (a.stock > b.stock) {return sortData == "ASC" ? 1 : -1};
        return 0;
    });
    printDataProduk(null, sortStock)
}

sortHarga = () => {
    sortData = document.getElementById("whatsort").value;
    let sortHarga = dbProduk.sort((a, b) => {
        if (a.harga < b.harga) {return sortData == "ASC" ? -1 : 1};
        if (a.harga > b.harga) {return sortData == "ASC" ? 1 : -1};
        return 0;
    });
    printDataProduk(null, sortHarga)
}





