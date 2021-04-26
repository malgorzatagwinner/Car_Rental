const RepositoryBase = require('./repositoryBase');

class KlientRepository extends RepositoryBase{
	constructor(db){
		super();
		this.db = db;
	}
	
	getAll(){
		const sql = 'SELECT * FROM Klient';
		return this.db.prepare(sql).all();
	}
	getbyId(id){
		const sql = "SELECT * FROM Klient WHERE idKlient = ?";
		
		const zmienna = this.db.prepare(sql).get(id);
		if(typeof zmienna == 'undefined'){
			throw new Error("WRONG ID")
		}
		return zmienna
	}
	
	getbyMail(mail){
		const sql = "SELECT * FROM Klient WHERE mail = ?";
		
		return this.db.prepare(sql).get(mail);
	}
	
	addKlient(nazwisko, imie, wiek, mail, prawo_jazdy, haslo){
		const sql = `
			INSERT INTO Klient
			(nazwisko, imie, wiek, mail, prawo_jazdy, haslo)
			VALUES (?, ?, ?, ?, ?, ?);`
		;
		const zmienna = this.db.prepare(sql).run(nazwisko, imie, wiek, mail, prawo_jazdy, haslo)
		return zmienna.lastInsertRowid
	}
	modifyKlient(id, nazwisko, imie, wiek, mail, prawo_jazdy, haslo){
		const sql = `UPDATE Klient
		SET nazwisko = @nazwisko, imie = @imie, wiek=@wiek, mail=@mail, prawo_jazdy = @prawo_jazdy, haslo=@haslo
		WHERE idKlient = @id`
		this.db.prepare(sql).run({id, nazwisko, imie, wiek, mail, prawo_jazdy, haslo})
	}
	deleteKlient(id){
		const sql = `DELETE FROM Klient
		WHERE idKlient = @id`
		this.db.prepare(sql).run({id})
	}
}

module.exports = KlientRepository;
