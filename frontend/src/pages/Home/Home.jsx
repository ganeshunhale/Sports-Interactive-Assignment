import React, { useEffect, useState } from 'react'
import Dropdown from '../../components/Dropdown/Dropdown';
import { useSelector } from 'react-redux';
import { Button, Modal } from 'antd';
import AddCountryForm from '../../components/AddCountry/AddCountry';
import style from './Home.module.scss'
import CountryCard from '../../components/CountryCard/CountryCard';

const Home = () => {
    const selectedCountry = useSelector(state => state.selectedCountry)
    const [visible, setVisible] = useState(false)
    useEffect(() => {
        console.log(selectedCountry);
    }, [selectedCountry])
    return (
        <div className={style.homeSection}>
            <h1>Country list</h1>
            <div className={style.content}>
                <Dropdown />
                <Button type="primary" onClick={() => setVisible(true)}>
                    Add country
                </Button>
            </div>
            {selectedCountry.name !== undefined && <CountryCard country={selectedCountry} />}
            <Modal title="Add a New Country"
                open={visible}
                onCancel={() => setVisible(false)}
                footer="">
                <AddCountryForm setVisible={setVisible} />
            </Modal>
        </div>
    )
}

export default Home