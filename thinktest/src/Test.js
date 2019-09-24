import React, {Component} from "react";
import './App.css';
import $ from 'jquery';
import {Table} from 'antd';
import 'bootstrap/dist/css/bootstrap.min.css';

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        sorter: true,
        render: name => name,
        width: '47.5%',
    },
    {
        title: 'ID',
        dataIndex: 'id',
        render: id => id,
        width: '47.5%',
    },
];

class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            pagination: {
                pageSize:8,
            },
        }
    }

    componentDidMount() {
        this.listRender();
    }

    listRender = (params = {}) => {
        console.log('params:', params);
        $.ajax({
            type: "POST",
            url: "http://127.0.0.1:8360/goods/index",
            data: params,
            dataType: "json",
        }).then(res => {
            const pagination = {...this.state.pagination};
            // Read total count from server
            // pagination.total = data.totalCount;
            pagination.total = res.data.count
            this.setState({
                loading: false,
                list: res.data.data,
                pagination,
            });
        });
    }

    handleTableChange = (pagination, filters, sorter) => {
        const pager = {...this.state.pagination};
        pager.currentPage = pagination.currentPage;
        this.setState({
            pagination: pager,
        });
        this.listRender({
            pageSize: pagination.pageSize,
            currentPage: pagination.current,
            total: pagination.total,
            /*sortField: sorter.field,
            sortOrder: sorter.order,
            ...filters,*/
        });
    };

    handleIdFind = e => {
        const _post =
            {
                search: this.input.value
            }
        console.log(_post)
        $.ajax({
            type: "POST",
            url: "http://127.0.0.1:8360/goods/id",
            data: _post,
            dataType: "json",
        }).then(res => {
            this.setState({
                loading: true,
                list: res.data.data,
            });
            console.log(res)
        });
    }

    render() {
        return (
            <div>
                <input type="text" ref={input => this.input = input}/>
                <button onClick={this.handleIdFind.bind(this)}>Search</button>
                <div className='body'>
                    <link rel="stylesheet"
                          href="https://npmcdn.com/react-bootstrap-table/dist/react-bootstrap-table-all.min.css">
                    </link>
                    <Table rowKey="id"
                           dataSource={this.state.list}
                           pagination={this.state.pagination}
                           columns={columns}
                           expandedRowRender={record => <p style={{ margin: 0 }}>{record.goods_desc}</p>}
                           onChange={this.handleTableChange}/>
                </div>
            </div>
        );
    }
}

export default Test;
