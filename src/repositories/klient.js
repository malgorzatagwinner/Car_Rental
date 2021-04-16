const RepositoryBase = require('./repositoryBase');

class KlientRepository extends RepositoryBase{
	constructor(db){
		super()
		this.db = db
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

	addType(nazwisko, imie, wiek, mail, prawo_jazdy){
		const sql = `INSERT INTO Klient
		(nazwisko, imie, wiek, mail, prawo_jazdy)
		VALUES(?, ?, ?, ?, ?);`;
		const zmienna = this.db.prepare(sql).run(nazwisko, imie, wiek, mail, prawo_jazdy)
		return zmienna.lastInsertRowid
	}
}
module.exports = KlientRepository;
