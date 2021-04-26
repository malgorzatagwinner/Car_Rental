const RepositoryBase = require('./repositoryBase');

class RodzajRepository extends RepositoryBase{
	constructor(db){
		super();
		this.db = db;
	}
	
	getAll(){
		const sql = 'SELECT * FROM Rodzaj';
		return this.db.prepare(sql).all();
	}
	getbyId(id){
		const sql = "SELECT * FROM Rodzaj WHERE idRodzaj = ?";
		const zmienna = this.db.prepare(sql).get(id);
		if(typeof zmienna == 'undefined'){
			throw new Error("WRONG ID")
		}
		return zmienna
	}
	getbyDate(from, to){
		const sql = `
		SELECT * FROM Rodzaj
		JOIN Samochod ON Samochod.Rodzaj_ID = Rodzaj.idRodzaj
		JOIN Rezerwacja ON Rezerwacja.Samochod_ID = Samochod.idSamochod
		WHERE idSamochod NOT IN(
			SELECT Samochod_ID FROM Rezerwacja
			WHERE(termin_od > @from and termin_od < @to)
			OR (termin_do > @from and termin_do < @to)
		)
		`;
	
		const zmienna = this.db.prepare(sql).all({ from: from, to: to });
			if(typeof zmienna == 'undefined'){
				return []
		}
		return zmienna
	}
	
	addType(model, marka, miejsca, rocznik, cena, zdjecie){
		const sql = `
		INSERT INTO Rodzaj
		(model, marka, miejsca, rocznik, cena, zdjecie)
		VALUES (?, ?, ?, ?, ?, ?);
		`;
		const zmienna = this.db.prepare(sql).run(model, marka, miejsca, rocznik, cena, zdjecie)
		return zmienna.lastInsertRowid
	}
	modifyType(id, model, marka, miejsca, rocznik, cena){
		const sql = `UPDATE Rodzaj
		SET model = @model, marka = @marka, miejsca = @miejsca,
		rocznik = @rocznik, cena = @cena, zdjecie = @zdjecie
		WHERE idRodzaj = @id 
		`
		this.db.prepare(sql).run({id, model, marka, miejsca, rocznik, cena, zdjecie})
	}
	deleteType(id){
		const sql = `DELETE FROM Rodzaj
		WHERE idRodzaj = @id`
		this.db.prepare(sql).run({id})
	}
}
module.exports = RodzajRepository;
