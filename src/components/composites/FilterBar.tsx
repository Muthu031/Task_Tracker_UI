import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilterOptions } from '../../state/taskStore';
import { TaskPriority, TaskStatus } from '../../types';
import { AppDispatch, RootState } from '../../state/uiStore';

const FilterBar: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const filterOptions = useSelector((state: RootState) => state.tasks.filterOptions);

    const handleStatusFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value === 'all' ? undefined : e.target.value as TaskStatus;
        dispatch(setFilterOptions({ status: value }));
    };

    const handlePriorityFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value === 'all' ? undefined : e.target.value as TaskPriority;
        dispatch(setFilterOptions({ priority: value }));
    };

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const [sortBy, sortDirection] = e.target.value.split('-');
        dispatch(setFilterOptions({
            sortBy: sortBy as 'dueDate' | 'priority' | 'createdAt',
            sortDirection: sortDirection as 'asc' | 'desc'
        }));
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = e.target.value || undefined;
        dispatch(setFilterOptions({ searchTerm }));
    };

    // Continuing src/components/composites/FilterBar.tsx

    return (
        <div className="bg-white border rounded-lg shadow-sm p-4 mb-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                    <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-1">
                        Status
                    </label>
                    <select
                        id="status-filter"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        value={filterOptions.status || 'all'}
                        onChange={handleStatusFilter}
                    >
                        <option value="all">All</option>
                        <option value={TaskStatus.PENDING}>Pending</option>
                        <option value={TaskStatus.COMPLETED}>Completed</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="priority-filter" className="block text-sm font-medium text-gray-700 mb-1">
                        Priority
                    </label>
                    <select
                        id="priority-filter"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        value={filterOptions.priority || 'all'}
                        onChange={handlePriorityFilter}
                    >
                        <option value="all">All</option>
                        <option value={TaskPriority.HIGH}>High</option>
                        <option value={TaskPriority.MEDIUM}>Medium</option>
                        <option value={TaskPriority.LOW}>Low</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="sort-by" className="block text-sm font-medium text-gray-700 mb-1">
                        Sort by
                    </label>
                    <select
                        id="sort-by"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        value={`${filterOptions.sortBy}-${filterOptions.sortDirection}`}
                        onChange={handleSortChange}
                    >
                        <option value="dueDate-asc">Due Date (Earliest First)</option>
                        <option value="dueDate-desc">Due Date (Latest First)</option>
                        <option value="priority-desc">Priority (High to Low)</option>
                        <option value="priority-asc">Priority (Low to High)</option>
                        <option value="createdAt-desc">Newest First</option>
                        <option value="createdAt-asc">Oldest First</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="search-tasks" className="block text-sm font-medium text-gray-700 mb-1">
                        Search
                    </label>
                    <input
                        id="search-tasks"
                        type="text"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        placeholder="Search tasks..."
                        value={filterOptions.searchTerm || ''}
                        onChange={handleSearch}
                    />
                </div>
            </div>
        </div>
    );
};

export default FilterBar;