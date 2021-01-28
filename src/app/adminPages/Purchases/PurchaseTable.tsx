import React from "react";
import { CardWrapper } from "../../components/adminStyledComponents";
import { Descriptions, Card, List } from "antd";
import { PurchaseItemType } from '../../types/interfaces';


export const PurchasesTable = ({purchase}: {purchase: PurchaseItemType}) => {
    return (
        <div>
            <CardWrapper>
                <Card title={`Purchase:${purchase.id}`} bordered={false} style={{ width: "100%" }}>
                    <Descriptions
                        bordered
                        layout="vertical"
                    >
                        <Descriptions.Item span={2} label="Email">{purchase.purchaseInfo.email}</Descriptions.Item>
                        <Descriptions.Item span={2} label="Full Name">{purchase.purchaseInfo.full_name}</Descriptions.Item>
                        <Descriptions.Item span={5} label="Price">
                            <p>Price: {purchase.invoice.amount.value}</p>
                            <p>Discount: {purchase.invoice.amount.breakdown.discount.value + " " + purchase.invoice.amount.breakdown.discount.currency_code}</p>
                            <p>Total: {purchase.invoice.amount.breakdown.item_total.value + " " + purchase.invoice.amount.breakdown.item_total.currency_code}</p>
                        </Descriptions.Item>
                        <Descriptions.Item span={5} label="Payment description">
                            {purchase.purchaseInfo.description}
                        </Descriptions.Item>

                        <Descriptions.Item label="items">
                            <List>
                                {purchase.invoice.items.map(item => {
                                    return <List.Item key={item.name}>
                                        <p>Name: {item.name}</p>
                                        <p>Currency: {item.currency}</p>
                                        <p>Price: {item.unit_amount.value} {item.unit_amount.currency_code}</p>
                                        <p>Quantity: {item.quantity}</p>
                                    </List.Item>
                                })}

                            </List>
                        </Descriptions.Item>

                    </Descriptions>
                </Card>
            </CardWrapper>
        </div>
    )
}