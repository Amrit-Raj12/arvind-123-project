import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { BsPlus } from "react-icons/bs";
import { FaEllipsisH } from "react-icons/fa";
import { TbAlertSquareFilled } from 'react-icons/tb';
import { CgProfile } from 'react-icons/cg';
import { TbCircleFilled } from 'react-icons/tb';
import './style.css';

// Card component
function Card({ id, title, content }) {
    return (
        <div className="Card">
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
function Column({ columnIndex, column, addCardToColumn }) {
    const droppableId = `column-${columnIndex}`;

    if (!column) {
        // Handle the case where column is undefined
        return null; // or render an error message or loading indicator
    }
    return (
        <div className="column">
            <div className='column-header'>
                <div className='user-detail-box'>
                    <div className="round-avatar">
                        <img src='https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png' alt="Avatar" className="avatar-img" width='60' height='40' />
                        {true && <div className="notification-dot"></div>}
                    </div>
                    <div className='name-box'>
                        <p style={{ marginLeft: '10px', fontSize: '16px' }}>Abhijit Maity</p>
                        <p style={{ marginLeft: '10px', fontSize: '16px' }}>1</p>
                    </div>
                </div>
                <div className='menu-box'>
                    <BsPlus onClick={() => addCardToColumn(columnIndex)} style={{ fontSize: '24px', cursor: 'pointer' }} />
                    <FaEllipsisH style={{ marginLeft: '10px', fontSize: '24px' }} />
                </div>
            </div>
            <Droppable droppableId={droppableId} key={columnIndex}>
                {(provided) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="card-list"
                    >
                        {column.cards.map((card, cardIndex) => (
                            <Draggable
                                key={cardIndex}
                                draggableId={`card-${cardIndex}`}
                                index={cardIndex}
                            >
                                {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                    >
                                        <Card
                                            id={`card-${cardIndex}`}
                                            title={card.title}
                                            content={card.content}
                                        />
                                    </div>
                                )}
                            </Draggable>
                        ))}
                    </div>
                )}
            </Droppable>
        </div>
    );
}

const Userview = () => {
    const [columns, setColumns] = useState([
        { name: 'Column 1', cards: [] },
        { name: 'Column 2', cards: [] },
        { name: 'Column 3', cards: [] },
    ]);

    const addCardToColumn = (columnIndex) => {
        setColumns((prevColumns) => {
            const newCard = {
                title: `Card ${prevColumns[columnIndex].cards.length + 1}`,
                content: `This is a new card in ${prevColumns[columnIndex].name}`,
            };

            const updatedColumns = [...prevColumns];
            updatedColumns[columnIndex].cards.push(newCard);
            return updatedColumns;
        });
    };

    const onDragEnd = (result) => {
        if (!result.destination) return;

        const { source, destination } = result;
        const updatedColumns = [...columns];
        const [movedCard] = updatedColumns[source.droppableId].cards.splice(
            source.index,
            1
        );
        updatedColumns[destination.droppableId].cards.splice(
            destination.index,
            0,
            movedCard
        );

        setColumns(updatedColumns);
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="container">
                {columns.map((column, columnIndex) => (
                    <Column
                        key={columnIndex}
                        columnIndex={columnIndex}
                        column={column} // Pass the 'column' object
                        addCardToColumn={addCardToColumn}
                    />
                ))}
            </div>
        </DragDropContext>
    );
}

export default Userview;

const data =
{
    tikets: [
        {
            id: "CAM-1",
            priority: 4,
            status: "Todo",
            tag: ['Feature request'],
            title: "Update User Profile Page UI",
            userId: "usr-1"
        },
        {
            id: "CAM-2",
            priority: 3,
            status: "In-progress",
            tag: ['Feature request'],
            title: "Update User Profile Page UI",
            userId: "usr-2"
        },
        {
            id: "CAM-3",
            priority: 5,
            status: "complete",
            tag: ['Feature request'],
            title: "Update User Profile Page UI",
            userId: "usr-3"
        }
    ],
    users: [
        {
            available: false,
            id: "usr-1",
            name: "Anoop sharma"
        },
        {
            available: true,
            id: "usr-2",
            name: "Arvind sharma"
        },
        {
            available: true,
            id: "usr-3",
            name: "Aman Kumar"
        }
    ]
}

