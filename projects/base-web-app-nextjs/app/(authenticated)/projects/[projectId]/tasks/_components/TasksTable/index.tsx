import { TTask } from '../../../../../../../_schemas/mariana';
import DataTable from '../../../../../../_components/DataTable';
import { TFilter } from '../../../../../../_components/Filter/_schemas';
import { TSort } from '../../../../../../_components/Sort/_schemas';
import { TaskTableColumns } from './config';

interface PropTypes {
  tasks: TTask[];
}

const TasksTable = ({ tasks }: PropTypes) => {


  return (
    <DataTable
      data={tasks}
      columns={TaskTableColumns}
      filterConfigs={[]}
      currentFilter={{ all: true, criteria: [] }}
      sortConfigs={[]}
      currentSort={{}}
      onFilterChange={function (filter: TFilter): void {
        throw new Error('Function not implemented.');
      }}
      onSortChange={function (sorts: TSort): void {
        throw new Error('Function not implemented.');
      }}
      totalRows={0}
      page={0}
      rowsPerPage={0}
      onPageChange={function (page: number): void {
        throw new Error('Function not implemented.');
      }}
      onRowsPerPageChange={function (rowsPerPage: number): void {
        throw new Error('Function not implemented.');
      }}
    />
  );
};

export default TasksTable;
