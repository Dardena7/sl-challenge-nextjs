import YodaClient from '../../db/YodaClient';
import YodaHead from "../../components/head/YodaHead";
import Navigation from "../../components/navigation/Navigation";
import AgencyList from "../../components/agency/AgencyList";
import CurrentFilters from '../../components/filter/CurrentFilters';
import SortBy from '../../components/filter/SortBy';
import Filter from '../../components/filter/Filter';
import {useEffect, useState} from 'react';

const AgenciesPage = (props) => {

    //FUNCTIONS

    //Filter
    const getFilteredAgencies = (agencies, filters) => {
        if (filters.length == 0) {
            return agencies;
        }
        return agencies.reduce((filteredAgencies, agency) => {
            return hasAllTags(agency, filters) ? filteredAgencies.concat(agency) : filteredAgencies;
        },[]);
    };

    const getDistinctFilters = (agencies) => {
        return agencies.reduce((allFilters, agency) => {
            return allFilters.concat(
                agency.tags.filter(filter => allFilters.indexOf(filter) < 0)
            );
        }, []).sort((a,b) => {
            return a >= b ? 1 : -1;
        });
    };


    const getNbAgencies = (tag, agencies) => {
        return agencies.reduce((nb, agency) => {
            return agency.tags.indexOf(tag) >= 0 ? ++nb : nb;
        }, 0);
    }


    const isChecked = (filter, filters) => {
        return filters.indexOf(filter) >= 0;
    }


    const updateAvailableFilters = (agencies, currentFilters) => {
        console.log(currentFilters);
        const newAvailableFilters = getDistinctFilters(agencies).map(filter => {
                return {
                    label: filter,
                    nbArticles: getNbAgencies(filter, agencies),
                    active: isChecked(filter, currentFilters)
                }
        });

        setAvailableFilters(newAvailableFilters);
    }


    const selectFilter = (filter) => {
        const newFilters = filters.slice();

        if (newFilters.indexOf(filter) < 0) {
            newFilters.push(filter);
            setFilters(newFilters);
        }
        else {
            newFilters.splice(newFilters.indexOf(filter), 1);
            setFilters(newFilters);
        }

        const filteredAgencies = updateAgenciesList(search,newFilters);
        updateAvailableFilters(filteredAgencies, newFilters);
    }


    const hasAllTags = (agency, tags) => {
        return tags.every(tag => agency.tags.indexOf(tag) >= 0);
    }


    //Search
    const searchAgency = (e) => {
        const search = e.target.value;

        setSearch(search);

        const filteredAgencies = updateAgenciesList(search, filters);
        updateAvailableFilters(filteredAgencies, filters);
    }

    const getSearchedAgencies = (agencies, search) => {
        search = search.trim().toLowerCase();
        if (search == '') {
            return agencies;
        }
        return agencies.reduce((searchedAgencies, agency) => {
            return containsSearch(agency, search) ? searchedAgencies.concat(agency) : searchedAgencies;
        },[]);
    };


    const containsSearch = (agency, search) => {
        let contains = false;
        const words = search.split(' ');

        const name = agency.name.toLowerCase().split(' ');
        const description = agency.description.toLowerCase().split(' ');
        const grade = agency.grade.toLowerCase().split(' ');

        for (const word of words) {
            contains = name.some(w => w.includes(word));
            if (!contains) {
                contains = grade.some(w => w.includes(word));
            }
            if (!contains) {
                contains = description.some(w => w.includes(word));
            }
            if (!contains) {
                contains = grade.some(w => w.includes(word));
            }
            if (contains) {
                break;
            }
        }

        return contains;
    }


    //Sort
    const sortList = (e) => {
        const sortBy = e.target.value;
        setSortBy(sortBy);
        const sortedAgencies = sortAgencies(filteredAgencies, sortBy);
        setFilteredAgencies(sortedAgencies);
    }

    const sortAgencies = (agencies, sortBy) => {
        if (sortBy == 'gradeAsc') {
            return agencies.sort((a,b) => {
                return gradeValue(a.grade) < gradeValue(b.grade) ? -1 : 1;
            });
        }
        else if (sortBy == 'gradeDesc') {
            return agencies.sort((a,b) => {
                return gradeValue(a.grade) >= gradeValue(b.grade) ? -1 : 1;
            });
        }
        else if (sortBy == 'nameAsc') {
            return agencies.sort((a,b) => {
                return a.name < b.name ? -1 : 1;
            });
        }
        else if (sortBy == 'nameDesc') {
            return agencies.sort((a,b) => {
                return a.name >= b.name ? -1 : 1;
            });
        }
        return agencies;
    }

    const gradeValue = (grade) => {
        switch (grade) {
            case 'Padawan' :
                return 1;
            case 'Jedi' :
                return 2;
            case 'Master':
                return 3;
            default:
                return 0;
        }
    }


    const updateAgenciesList = (search, filters) => {
        const filteredAgencies = sortAgencies(
            getSearchedAgencies(
                getFilteredAgencies(agencies, filters)
                , search)
            , sortBy);

        setFilteredAgencies(filteredAgencies);

        return filteredAgencies;
    }


    const resetFilters = () => {
        setFilters([]);
        setSearch('');
        updateAgenciesList('', []);
    }


    //PROPERTIES

    const title = "Agencies List";
    const meta_description = "Yoda Agencies List";

    const [sortBy, setSortBy] = useState('gradeDesc');
    const [filters, setFilters] = useState(Array());
    const [search, setSearch] = useState('');

    const [agencies, setAgencies] = useState(props.agencies);

    const [filteredAgencies, setFilteredAgencies] = useState([]);
    const [availableFilters, setAvailableFilters] = useState([]);

    //useEffect

    useEffect(() => {
        updateAgenciesList('', []);
        updateAvailableFilters(agencies, []);
    }, []);


    //Template
    return (
        <>
            <YodaHead title={title} meta_description={meta_description}/>

            <Navigation/>

            <main>
                <h1 className={'star-wars-font'}>
                    Agencies List
                </h1>

                <p className='page-description'>
                    Find the agency that fit your needs among all our agencies !
                </p>

                <section className='container'>
                    <div className='row'>
                        <section className='col-md-3'>
                            <Filter
                                onSelect={selectFilter}
                                availableFilters={availableFilters}
                            />
                        </section>
                        <section className='col-md-9'>
                            <div>
                                <h2>Search : </h2>
                                <input onChange={(e) => searchAgency(e,filteredAgencies)} type="text" className="form-control" value={search}/>
                            </div>
                            <hr/>
                            <CurrentFilters filters={filters} />
                            <div>
                                <button onClick={() => resetFilters()} className='btn btn-danger'>Reset</button>
                            </div>
                            <hr/>
                            <SortBy
                                onSort={sortList}
                                options={[
                                    {value:'gradeAsc', label:'Grade Low to High'},
                                    {value:'gradeDesc', label:'Grade High to Low'},
                                    {value:'nameAsc', label:'Name A to Z'},
                                    {value:'nameDesc', label:'Name Z to A'},
                                ]}
                                value={sortBy}
                            />
                            <hr/>
                            <AgencyList filteredAgencies={filteredAgencies}/>
                        </section>
                    </div>
                </section>
            </main>
        </>
    )
};


export async function getStaticProps() {

    const client = await YodaClient();
    const db = client.db();
    const agenciesCollection = db.collection('yoda-agency');
    const agencies = await agenciesCollection.find().toArray();
    client.close();

    return {
        props: {
            agencies: agencies.map(agency => ({
                name: agency.name,
                description: agency.description,
                grade: agency.grade,
                tags: agency.tags.split(',').map(
                    tag => {
                        tag = tag.trim().toLowerCase();
                        return tag[0].toUpperCase() + tag.slice(1);
                    }
                ),
                image: agency.image,
                id: agency._id.toString(),
            })),
        },
        revalidate: 1
    };
}

export default AgenciesPage;
