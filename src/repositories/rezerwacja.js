const RepositoryBase = require('./repositoryBase');

class RezerwacjaRepository extends RepositoryBase{
	constructor(db){
		super();
		this.db = db;
	}
	
	getAll(){
		const sql = 'SELECT * FROM Rezerwacja';
		return this.db.prepare(sql).all();
	}
	getbyId(id){
		const sql = "SELECT * FROM Rezerwacja WHERE idRezerwacja = ?";
		
		const zmienna = this.db.prepare(sql).get(id);
		if(typeof zmienna == 'undefined'){
			throw new Error("WRONG ID")
		}
		return zmienna
	}
	getAllwInfo(){
		const sql = `SELECT * FROM Rezerwacja JOIN Samochod ON Rezerwacja.Samochod_ID = Samochod.idSamochod 
JOIN Rodzaj ON Samochod.Rodzaj_ID = Rodzaj.idRodzaj
JOIN Klient ON Klient.idKlient = Rezerwacja.Klient_ID`;
		return this.db.prepare(sql).all();
	}
	
	confirm(id){
		const sql = `UPDATE Rezerwacja SET isconfirmed = 1 WHERE idRezerwacja = ?`;
		return this.db.prepare(sql).run(id);
	}
	
	getAllbyClient(id){
		const sql = `
SELECT *, Rodzaj.cena*ROUND(JULIANDAY(termin_do) - JULIANDAY(termin_od)) AS cena_cala 
FROM Rezerwacja 
JOIN Samochod ON Rezerwacja.Samochod_ID = Samochod.idSamochod 
JOIN Rodzaj ON Samochod.Rodzaj_ID = Rodzaj.idRodzaj
WHERE Klient_ID = ?`;
		
		const zmienna = this.db.prepare(sql).all(id);
		if(typeof zmienna == 'undefined'){
			throw new Error("WRONG ID")
		}	return zmienna	
	}
	
	getbyClient(id){
		const sql = "SELECT * FROM Rezerwacja WHERE Klient_ID = ?";
		
		const zmienna = this.db.prepare(sql).all(id);
		if(typeof zmienna == 'undefined'){
			throw new Error("WRONG ID")
		}		
	}
	
	addRez(termin_od, termin_do, Klient_ID, Samochod_ID){
		const sql = `INSERT INTO Rezerwacja
		(termin_od, termin_do, Klient_ID, Samochod_ID)
		VALUES (?, ?, ?, ?);`;
		const zmienna = this.db.prepare(sql).run(termin_od, termin_do, Klient_ID, Samochod_ID)
		return zmienna.lastInsertRowid
	}
	modifyRez(id, termin_od, termin_do, Klient, Samochod){
		const sql = `UPDATE Rezerwacja
		SET termin_od = @termin_od, termin_do = @termin_do, Klient_ID = @Klient, Samochod_ID = @Samochod
		WHERE idRezerwacja = @id`
		this.db.prepare(sql).run({id,termin_od, termin_do, Klient, Samochod})
	}
	deleteRez(id){
		const sql = `DELETE FROM Rezerwacja
		WHERE idRezerwacja = @id`
		this.db.prepare(sql).run({id})
	}
	
}

module.exports = RezerwacjaRepository;
