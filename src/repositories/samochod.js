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
		return zmienna
	}
	getbyDate(from, to){
		const sql = `
		SELECT *,  Rodzaj.cena*ROUND(JULIANDAY(@to) - JULIANDAY(@from)) AS cena_cala FROM Rodzaj
		JOIN Samochod ON Samochod.Rodzaj_ID = Rodzaj.idRodzaj
		WHERE idSamochod NOT IN(
			SELECT Samochod_ID FROM Rezerwacja
			WHERE(termin_od > @from and termin_od < @to)
			OR (termin_do > @from and termin_do < @to)
		)
		`;
	
		return this.db.prepare(sql).all({ from: from, to: to });
	}
	getwithType(id, from, to){
		const sql = `
		SELECT *,  Rodzaj.cena*ROUND(JULIANDAY(@to) - JULIANDAY(@from)) AS cena_cala FROM Rodzaj
		JOIN Samochod ON Samochod.Rodzaj_ID = Rodzaj.idRodzaj
		WHERE idSamochod=?
		`;
	
		const zmienna = this.db.prepare(sql).get(id, {from, to});
		if(typeof zmienna == 'undefined'){
			throw new Error("WRONG ID")
		}
		return zmienna
	}
	addCar(rejestracja, Rodzaj_ID, kolor){
		console.log(nr);
		const sql = `
			INSERT INTO Samochod
			(rejestracja, Rodzaj_ID)
			VALUES (?, ?, ?);`
		;
		const zmienna = this.db.prepare(sql).run(rejestracja, Rodzaj_ID, kolor)
		return zmienna.lastInsertRowid
	}
	modifyCar(id, rejestracja, rodzaj, kolor){
		const sql = `UPDATE Samochod
		SET rejestracja = @rodzaj, Rodzaj_ID = @rodzaj, kolor = @kolor
		WHERE idSamochod = @id`
		this.db.prepare(sql).run({id, rejestracja, rodzaj, kolor})
	}
	deleteCar(id){
		const sql = `DELETE FROM Samochod
		WHERE idSamochod = @id`
		this.db.prepare(sql).run({id})
	}
}

module.exports = SamochodRepository;
