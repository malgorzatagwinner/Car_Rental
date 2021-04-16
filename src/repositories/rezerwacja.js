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
	}
	
	getbyClient(id){
		const sql = "SELECT * FROM Rezerwacja WHERE Klient_ID = ?";
		
		const zmienna = this.db.prepare(sql).get(id);
		if(typeof zmienna == 'undefined'){
			throw new Error("WRONG ID")
		}		
	}
	addRez(termin_od, termin_do, Klient_ID, Samochód_ID){
		const sql = `INSERT INTO Rezerwacja
		(termin_od, termin_do, Klient_ID, Samochód_ID)
		VALUES (?, ?, ?, ?);`;
		const zmienna = this.db.prepare(sql).run(termin_od, termin_do, Klient_ID, Samochód_ID)
		return zmienna.lastInsertRowid
	}
	
}

module.exports = RezerwacjaRepository;
