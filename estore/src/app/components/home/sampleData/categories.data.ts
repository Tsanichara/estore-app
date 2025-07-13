import { CategoryType } from "../types/categoryType";

export const categories: CategoryType[] = [
    {
        id: 1,
        category: 'Men',
    },
    {
        id: 2,
        category: 'Women',
    },
    {
        id: 3,
        category: 'Casual Wear',
        parent_category_id: 1,
    },
    {
        id: 4,
        category: 'Outdoor wear',
        parent_category_id: 2,
    },
    {
        id: 5,
        category: 'foot wear',
        parent_category_id: 2,
    },
];