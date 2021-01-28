import React, { Dispatch, useEffect } from 'react';
import { Divider, Card, Space, Button } from 'antd';
import { PageContent, PageHeader, PageTitle, CardWrapper } from "../../components/adminStyledComponents";
import { StateType, UserType } from '../../types/interfaces';
import { connect } from 'react-redux';
import { getUsersThunk } from '../../redux/reducers/UsersReducer';
import { Footer } from 'antd/lib/layout/layout';
import { Loader } from '../../components/Loader';
import { getUsersSelector, getUsersLoadedSelector } from '../../selectors/selectors';


type OwnProps = {
    children: React.ReactNode
}

type MapStateProps = {
    users: Array<UserType>,
    isLoaded: boolean
}

type MapDispatchProps = {
    getUsers: () => void
}

type TopBuyersProps = OwnProps & MapStateProps & MapDispatchProps

const TopBuyers = ({ getUsers, users, isLoaded }: TopBuyersProps) => {

    useEffect(() => {
        if (!isLoaded)
            getUsers();
    }, [])


    return (

        <PageContent>
            <PageHeader>
                <PageTitle>Top buyers</PageTitle>
            </PageHeader>

            <Divider />
            <CardWrapper>

                {isLoaded ? null : <Loader/>}
                <Space style={{ width: "100%" }} direction="vertical">
                    {
                        users.map((user) => {
                            return <Card key={user.email} style={{ width: "100%" }}>
                                <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
                                    <div style={{ width: "20%" }}>
                                        <h2>Username:</h2>
                                        <p>{user.username}</p>
                                    </div>

                                    <div style={{ width: "20%" }}>
                                        <h2>Email:</h2>
                                        <p>{user.email}</p>
                                    </div>

                                    <div style={{ width: "40%" }}>
                                        <h2>Amount of purchases:</h2>
                                        <p>{user.userPurchasesCount}</p>
                                    </div>
                                </div>
                                <Button type="primary">Get all purchases</Button>

                            </Card>
                        })
                    }
                    
                </Space>
            </CardWrapper>
            <Footer>
                
            </Footer>
        </PageContent>

    )
}

//getUsersThunk
const mapStateToProps = (state: StateType) => {
    return {
        users: getUsersSelector(state),
        isLoaded: getUsersLoadedSelector(state)
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        getUsers: () => dispatch(getUsersThunk())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(TopBuyers);
