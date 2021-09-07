import YodaClient from '../../db/YodaClient';
import YodaHead from "../../components/head/YodaHead";
import Navigation from "../../components/navigation/Navigation";
import AgencyList from "../../components/agency/AgencyList";
import CurrentFilters from '../../components/filter/CurrentFilters';
import SortBy from '../../components/filter/SortBy';
import Filter from '../../components/filter/Filter';
import {useEffect, useState} from 'react';
import useSWR from "swr";

const AgenciesPage = (props) => {

    //FUNCTIONS

    //Filter
    const getFilteredAgencies = (agencies, filters) => {
        if (filters.length === 0) {
            return agencies;
        }
        return agencies.reduce((filteredAgencies, agency) => {
            return hasAllTags(agency, filters) ? filteredAgencies.concat(agency) : filteredAgencies;
        }, []);
    };

    const getDistinctFilters = (agencies) => {
        return agencies.reduce((allFilters, agency) => {
            return allFilters.concat(
                agency.tags.filter(filter => allFilters.indexOf(filter) < 0)
            );
        }, []).sort((a, b) => {
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
        } else {
            newFilters.splice(newFilters.indexOf(filter), 1);
            setFilters(newFilters);
        }

        const filteredAgencies = updateAgenciesList(agencies, search, newFilters);
        updateAvailableFilters(filteredAgencies, newFilters);
    }


    const hasAllTags = (agency, tags) => {
        return tags.every(tag => agency.tags.indexOf(tag) >= 0);
    }


    //Search
    const searchAgency = (e) => {
        const search = e.target.value;

        setSearch(search);

        const filteredAgencies = updateAgenciesList(agencies, search, filters);
        updateAvailableFilters(filteredAgencies, filters);
    }

    const getSearchedAgencies = (agencies, search) => {
        search = search.trim().toLowerCase();
        if (search === '') {
            return agencies;
        }
        return agencies.reduce((searchedAgencies, agency) => {
            return containsSearch(agency, search) ? searchedAgencies.concat(agency) : searchedAgencies;
        }, []);
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
        if (sortBy === 'gradeAsc') {
            return agencies.sort((a, b) => {
                return gradeValue(a.grade) < gradeValue(b.grade) ? -1 : 1;
            });
        } else if (sortBy === 'gradeDesc') {
            return agencies.sort((a, b) => {
                return gradeValue(a.grade) >= gradeValue(b.grade) ? -1 : 1;
            });
        } else if (sortBy === 'nameAsc') {
            return agencies.sort((a, b) => {
                return a.name < b.name ? -1 : 1;
            });
        } else if (sortBy === 'nameDesc') {
            return agencies.sort((a, b) => {
                return a.name >= b.name ? -1 : 1;
            });
        }
        return agencies;
    }

    const gradeValue = (grade) => {
        switch (grade.toLowerCase()) {
            case 'padawan' :
                return 1;
            case 'jedi' :
                return 2;
            case 'master':
                return 3;
            default:
                return 0;
        }
    }


    const updateAgenciesList = (agencies, search, filters) => {
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
        updateAgenciesList(agencies, '', []);
        updateAvailableFilters(agencies, []);
    }


    //PROPERTIES

    const title = "Agencies List";
    const meta_description = "Yoda Agencies List";

    const [sortBy, setSortBy] = useState('gradeDesc');
    const [filters, setFilters] = useState(Array());
    const [search, setSearch] = useState('');

    const [agencies, setAgencies] = useState(Array());

    const [filteredAgencies, setFilteredAgencies] = useState(Array());
    const [availableFilters, setAvailableFilters] = useState(Array());


    //Fetching datas
    const fetcher = async (url) => {
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return res.json();
    }


    const {data} = useSWR('/api/fetchAgencies', fetcher, {initialData: props, revalidateOnMount: true});

    useEffect(() => {
        setAgencies(data.agenciesData);
        updateAgenciesList(data.agenciesData, '', []);
        updateAvailableFilters(data.agenciesData, []);
    }, [data]);


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
                                <input onChange={(e) => searchAgency(e, filteredAgencies)} type="text"
                                       className="form-control" value={search}/>
                            </div>
                            <hr/>
                            <CurrentFilters filters={filters} onReset={resetFilters}/>
                            <hr/>
                            <SortBy
                                onSort={sortList}
                                options={[
                                    {value: 'gradeAsc', label: 'Grade Low to High'},
                                    {value: 'gradeDesc', label: 'Grade High to Low'},
                                    {value: 'nameAsc', label: 'Name A to Z'},
                                    {value: 'nameDesc', label: 'Name Z to A'},
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
            agenciesData: agencies.map(agency => ({
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
