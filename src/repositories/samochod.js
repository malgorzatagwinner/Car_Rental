const RepositoryBase = require('./repositoryBase');

class SamochodRepository extends RepositoryBase{
	constructor(db){
		super();
		this.db = db;
	}
	
	getAll(){
		const sql = 'SELECT * FROM Samochod';
		return this.db.prepare(sql).all();
	}
	getbyId(id){
		const sql = "SELECT * FROM Samochod WHERE idSamochod = ?";
		
		const zmienna = this.db.prepare(sql).get(id);
		if(typeof zmienna == 'undefined'){
			throw new Error("WRONG ID")
		}
		
	}
	addCar(id, nr, type){
		const sql = `
			INSERT INTO Samochod
			(idSamochod, rejestracja, Rodzaj_ID)
			VALUES (?, ?, ?);`
		;
		const zmienna = this.db.prepare(sql).run(id, nr, type)
		return zmienna.lastInsertRowid
	}
}

module.exports = SamochodRepository;
