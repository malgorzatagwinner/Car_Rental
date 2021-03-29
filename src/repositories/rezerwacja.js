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
	
}

module.exports = RezerwacjaRepository;
