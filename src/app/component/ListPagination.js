import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

export class ListPagination extends Component {

    componentDidMount() {
    }

    onPageChanged = (value) => {
        this.props.onPageChanged(value);
    }

    render() {
        const self = this;
        const paginationResult = self.props.result ? self.props.result : null;
        const currentPage = paginationResult.currentPage;
        const prevPage = paginationResult.prevPage;
        const nextPage = paginationResult.nextPage;
        const totalPages = paginationResult.totalPages;
        const paginationLeft = self.generateItemsOfPaginationLeft(currentPage);
        const paginationRight = self.generateItemsOfPaginationRight(currentPage, totalPages);

        const isPrevDisabled = !prevPage ? true : false;
        const isNextDisabled = !nextPage ? true : false;

        return (
            <div className={"d-flex justify-content-center"}>
                <Pagination className="b-pagination" aria-label="Page navigation example">
                    <PaginationItem disabled={currentPage === 1 ? true : false}>
                        <PaginationLink previous onClick={ () => this.onPageChanged(1)} />
                    </PaginationItem>
                    <PaginationItem disabled={isPrevDisabled}>
                        <PaginationLink onClick={ () => this.onPageChanged(prevPage)}>
                            Prev
                        </PaginationLink>
                    </PaginationItem>
                    {
                        paginationLeft.map(item => {
                            return <PaginationItem key={item}>
                                <PaginationLink onClick={ () => this.onPageChanged(item)}>
                                    { item }
                                </PaginationLink>
                                </PaginationItem>
                        })
                    }
                    <PaginationItem active>
                        <PaginationLink>
                            { currentPage }
                        </PaginationLink>
                    </PaginationItem>
                    {
                        paginationRight.map((item, index) => {
                            return <PaginationItem key={item}>
                                <PaginationLink onClick={ () => this.onPageChanged(item)}>
                                    { item }
                                </PaginationLink>
                                </PaginationItem>
                        })
                    }

                    <PaginationItem disabled={isNextDisabled}>
                        <PaginationLink onClick={ () => this.onPageChanged(nextPage)}>
                            Next
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem disabled={currentPage === totalPages}>
                        <PaginationLink next onClick={ () => this.onPageChanged(totalPages)} />
                    </PaginationItem>
                </Pagination>
            </div>
        );
    }

    generateItemsOfPaginationLeft(currentPage) {
        let items = [];
        for (let i = currentPage - 3; i < currentPage; i++) {
            if (i > 0) {
                items.push(i);
            }
        }
        return items;
    }

    generateItemsOfPaginationRight(currentPage, lastPage) {
        let items = [];
        for (let i = currentPage + 1; i <= lastPage; i++) {
            items.push(i);
            if (i >= currentPage + 3) {
                break;
            }
        }
        return items;
    }

}

ListPagination.propTypes = {
    result: PropTypes.object.isRequired
}

