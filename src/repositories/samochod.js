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
	addCar(nr, type){
		console.log(nr);
		const sql = `
			INSERT INTO Samochod
			(rejestracja, Rodzaj_ID)
			VALUES (?, ?);`
		;
		const zmienna = this.db.prepare(sql).run(nr, type)
		return zmienna.lastInsertRowid
	}
}

module.exports = SamochodRepository;
