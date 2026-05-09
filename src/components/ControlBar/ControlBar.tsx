import "./ControlBar.css"

interface PropsCategory{
    alPresionarSeries:(valor:string)=>void;
    alPresionarSubgroup:(valor:string)=>void;
    alPresionarOrigin:(valor:string)=>void;
    alPresionarReleaseYear:(valor:string)=>void;
    alPresionarPrice:(valor:string)=>void;
    alPresionarStock:(valor:string)=>void;
}

interface PropsSearch{
    alEscribir:(valor:string)=>void;
}

interface PropsOrdenar{
    alOrdenar:(valor:string)=>void;
}

function Category({alPresionarSeries, alPresionarSubgroup, alPresionarOrigin, alPresionarReleaseYear, alPresionarPrice, alPresionarStock}: PropsCategory){
    return(
        <>
            <label htmlFor="series">Serie: </label>
            <select id="series" className="category-filter" onChange={(e)=>alPresionarSeries(e.target.value)}>
                <option value="All">All</option>
                <option value="Age of the Primes">Age of the Primes</option>
                <option value="Studio Series">Studio Series</option>
                <option value="War for Cybertron: Siege">War for Cybertron: Siege</option>
                <option value="War for Cybertron: Earthrise">War for Cybertron: Earthrise</option>
                <option value="War for Cybertron: Kingdom">War for Cybertron: Kingdom</option>
            </select>
            <label htmlFor="subgroup">Subgroup: </label>
            <select id="subgroup" className="category-filter" onChange={(e)=>alPresionarSubgroup(e.target.value)}>
                <option value="All">All</option>
                <option value="Core Class">Core Class</option>
                <option value="Deluxe Class">Deluxe Class</option>
                <option value="Voyager Class">Voyager Class</option>
                <option value="Leader Class">Leader Class</option>
                <option value="Commander Class">Commander Class</option>
                <option value="Titan Class">Titan Class</option>
            </select>
            <label htmlFor="origin">Origin: </label>
            <select id="origin" className="category-filter" onChange={(e)=>alPresionarOrigin(e.target.value)}>
                <option value="All">All</option>
                <option value="G1 Transformers (1984)">G1 Transformers (1984)</option>
                <option value="G1 Transformers (1985)">G1 Transformers (1985)</option>
                <option value="G1 Transformers (1986)">G1 Transformers (1986)</option>
                <option value="G1 Transformers (1987)">G1 Transformers (1987)</option>
                <option value="G1 Transformers (1988)">G1 Transformers (1988)</option>
                <option value="G1 Transformers: Aerialbots (1986)">G1 Transformers: Aerialbots (1986)</option>
                <option value="G1 Transformers: Combaticons (1986)">G1 Transformers: Combaticons (1986)</option>
                <option value="G1 Transformers: Dinobots (1985)">G1 Transformers: Dinobots (1985)</option>
                <option value="G1 Transformers: Predacons (1986)">G1 Transformers: Predacons (1986)</option>
                <option value="G2 Transformers: Dinobots (1993)">G2 Transformers: Dinobots (1993)</option>
                <option value="The Transformers: The Movie (1986)">The Transformers: The Movie (1986)</option>
                <option value="The Transformers: The Rebirth (1987)">The Transformers: The Rebirth (1987)</option>
                <option value="Beast Wars (1996)">Beast Wars (1996)</option>
                <option value="Beast Wars (1997)">Beast Wars (1997)</option>
                <option value="Beast Wars Neo (1998)">Beast Wars Neo (1998)</option>
                <option value="Beast Wars: Fossilizer">Beast Wars: Fossilizer</option>
                <option value="Beast Wars: Shattered Glass">Beast Wars: Shattered Glass</option>
                <option value="The Covenant of Primus">The Covenant of Primus</option>
                <option value="The Covenant of Primus / G1">The Covenant of Primus / G1</option>
                <option value="Marvel Transformers UK">Marvel Transformers UK</option>
                <option value="Transformers: Armada (2002)">Transformers: Armada (2002)</option>
                <option value="Transformers: Age of Extinction (2014)">Transformers: Age of Extinction (2014)</option>
            </select>
            <label htmlFor="release_year">Año de Lanzamiento: </label>
            <select id="release_year" className="category-filter" onChange={(e)=>alPresionarReleaseYear(e.target.value)}>
                <option value="All">All</option>
                <option value="2018">2018</option>
                <option value="2019">2019</option>
                <option value="2020">2020</option>
                <option value="2021">2021</option>
                <option value="2022">2022</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
                <option value="2026">2026</option>
            </select>
            <label htmlFor="price">Precio: </label>
            <select id="price" className="category-filter" onChange={(e)=>alPresionarPrice(e.target.value)}>
                <option value="All">All</option>
                <option value="<= $500 MXN">&lt;= $500 MXN</option>
                <option value="> $500 MXN & <= $1,000 MXN">&gt; $500 MXN &lt;= $1,000 MXN</option>
                <option value="> $1,000 MXN & <= $2,000 MXN">&gt; $1,000 MXN &lt;= $2,000 MXN</option>
                <option value="> $2,000 MXN">&gt; $2,000 MXN</option>
            </select>
            <label htmlFor="stock">Stock: </label>
            <select id="stock" className="category-filter" onChange={(e)=>alPresionarStock(e.target.value)}>
                <option value="All">All</option>
                <option value="<= 5">&lt;= 5</option>
                <option value="> 5 & <= 10">&gt; 5 &lt;= 10</option>
                <option value="> 10 & <= 15">&gt; 10 &lt;= 15</option>
                <option value="> 15">&gt; 15</option>
            </select>
        </>
    )
}

function Search({alEscribir}:PropsSearch){
    return(
        <input type="text"
        className="search-input"
        placeholder="Busca tu Transformer"
        onChange={(e)=>alEscribir(e.target.value)}
        />
    )
}

function Ordenar({alOrdenar}:PropsOrdenar){
    return(
        <select className="category-filter" onChange={(e)=>alOrdenar(e.target.value)}>
            <option value="none">Ordenar por</option>
            <option value="nombre-az">Nombre A-Z</option>
            <option value="nombre-za">Nombre Z-A</option>
            <option value="precio-asc">Precio menor a mayor</option>
            <option value="precio-desc">Precio mayor a menor</option>
        </select>
    )
}

function CreateModal(){
    return(
        <button type="button" className="btn btn-primary create-button" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
            Crear
        </button>
    )
}

export default function ControlBar({alPresionarSeries, alPresionarSubgroup, alPresionarOrigin, alPresionarReleaseYear, alPresionarPrice, alPresionarStock, alEscribir, alOrdenar}: PropsCategory & PropsSearch & PropsOrdenar){
    return(
        <div className="control-bar">
            <Category
                alPresionarSeries={alPresionarSeries}
                alPresionarSubgroup={alPresionarSubgroup}
                alPresionarOrigin={alPresionarOrigin}
                alPresionarReleaseYear={alPresionarReleaseYear}
                alPresionarPrice={alPresionarPrice}
                alPresionarStock={alPresionarStock}
            />
            <Ordenar alOrdenar={alOrdenar}/>
            <Search alEscribir={alEscribir}/>
            <CreateModal/>
        </div>
    )
}