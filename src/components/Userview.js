import React, { useEffect, useState } from 'react';
import { BsPlus } from "react-icons/bs";
import { FaEllipsisH } from "react-icons/fa";
import { TbAlertSquareFilled } from 'react-icons/tb';
import { CgProfile } from 'react-icons/cg';
import { TbCircleFilled } from 'react-icons/tb';
import './style.css';

// Card component
function Card({ id, title, content }) {
    return (
        <div key={id} id={id} className="Card">
            <div className='cardHeader'>
                <h6>{title}</h6>
                <CgProfile />
            </div>
            <p>{content}t</p>
            <div className='cardBase'>
                <div className='alertI'> <TbAlertSquareFilled /> </div>
                <div className="request">
                    <TbCircleFilled />
                    <p>Feature Request</p>
                </div>
            </div>
        </div>
    );
}

// Column component
function Column({ id, columnIndex, column, addCardToColumn }) {
    const columnCards = column.cards.filter((card) => card.userId === id);
    return (
        <div id={id} className="column">
            <div className='column-header'>
                <div className='user-detail-box'>
                    <div className="round-avatar">
                        <img src='https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png' alt="Avatar" className="avatar-img" width='60' height='40' />
                        {true && <div className="notification-dot"></div>}
                    </div>
                    <div className='name-box'>
                        <p style={{ marginLeft: '10px', fontSize: '16px' }}>{column.name}</p>
                        {/* <p style={{ marginLeft: '10px', fontSize: '16px' }}>1</p> */}
                    </div>
                </div>
                <div className='menu-box'>
                    <BsPlus onClick={() => addCardToColumn(columnIndex)} style={{ fontSize: '24px', cursor: 'pointer' }} />
                    <FaEllipsisH style={{ marginLeft: '10px', fontSize: '24px' }} />
                </div>
            </div>
            <div
                className="card-list"
            >
                {/* {console.log('column', column)} */}
                {columnCards.map((card, cardIndex) => (
                    <div
                    >
                        {/* {console.log('card', column)} */}
                        {id === card.userId && <Card
                            id={`card-${cardIndex}`}
                            title={card.title}
                            content={`ID: ${card.id}`}
                        />}
                    </div>
                ))}
            </div>
        </div>
    );
}

const Userview = () => {
    const [columns, setColumns] = useState([]);

    const [data, setData] = useState([]);

    useEffect(() => {
        const apiUrl = ' https://api.quicksell.co/v1/internal/frontend-assignment';
        fetch(apiUrl)
            .then((response) => response.json())
            .then((responseData) => {
                // console.log('response', responseData)
                setData([responseData]);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);
    useEffect(() => {
        // Transform the data into columns
        if (data && data?.[0]?.users) {
            const transformedColumns = data[0].users.map((user) => ({
                name: user.name,
                id: user.id,
                cards: data[0].tickets,
            }));
            setColumns(transformedColumns);
        }



    }, [data]);

    const addCardToColumn = (columnIndex) => {
        setColumns((prevColumns) => {
            const newCard = {
                id: prevColumns[columnIndex].id,
                title: `Card ${prevColumns[columnIndex].cards.length + 1}`,
                content: `This is a new card in ${prevColumns[columnIndex].name}`,
            };

            const updatedColumns = [...prevColumns];
            console.log('newCard', newCard)
            updatedColumns[columnIndex].cards.push(newCard);
            return updatedColumns;
        });
    };
    return (
        <div className="container">
            {/* {console.log('columns111', columns)} */}
            {columns && columns.map((column, columnIndex) => (
                <Column
                    key={columnIndex}
                    id={column.id}
                    columnIndex={columnIndex}
                    column={column}
                    addCardToColumn={addCardToColumn}
                />
            ))}
        </div>
    );
}

export default Userview;
