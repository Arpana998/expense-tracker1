const SingleItem = (props) => {
  console.log(props);
  return (
    <tbody className='table-group-divider'>
      <tr className="className='fs-3 fw-semibold">
        <th scope='row'>1</th>
        <td>{props.desciption}</td>
        <td>{props.amount}</td>
        <td>{props.category}</td>
        <td>
          <button>Delete</button>
          <button>Edit</button>
        </td>
      </tr>
    </tbody>
  );
};

export default SingleItem;
