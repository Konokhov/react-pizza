import {useState, useEffect, useContext} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import qs from 'qs';
import { useNavigate} from "react-router-dom";

import { setCurrentPage, setFilters } from "../redux/slices/filterSlice";
import { SearchContext } from '../App';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';

const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {categoryId, sort, currentPage} = useSelector(state => state.filter);
    const sortType = sort.sortProperty;

    const {searchValue} = useContext(SearchContext);
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const onChangePage = number => {
        dispatch(setCurrentPage(number))
    };

    useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1));
            dispatch(
                setFilters(
                    // ...params,
                )
            )
        }
    }, [])
  
    useEffect(() => {
        setIsLoading(true);

        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const search = searchValue ? `&search=${searchValue}` : ''; // Фильтрация из backend

        axios.get(`https://63ad3d3234c46cd7ae93bf4e.mockapi.io/items?page=${currentPage}&limit=4&${category}${search}&sortBy=${sortType}&order=desc`)
            .then(res => {
                setIsLoading(false);
                setItems(res.data);
            });

        window.scrollTo(0, 0);
    }, [categoryId, sortType, searchValue, currentPage]);

    useEffect(() => {
        const queryString = qs.stringify({
            sortProperty: sort.sortProperty,
            categoryId,
            currentPage,
        });

        navigate(`?${queryString}`)
    }, [categoryId, sortType, currentPage]);

    const pizzas = items.map((obj, index) => (<PizzaBlock key={index} {...obj}/>));

    const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

    return (
        <>
            <div className="content__top">
                <Categories />
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
             {isLoading ? skeletons : pizzas}
            </div>
            <Pagination currentPage={currentPage} onChangePage={onChangePage} />
        </>
    )
}

export default Home