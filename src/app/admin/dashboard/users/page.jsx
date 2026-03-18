export default function UsersPage() {
  return (
    <div>

      <h1 className="text-2xl font-bold mb-6">
       Customers
      </h1>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-4">Name</th>
              <th>Email</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>

            <tr className="border-t">
              <td className="p-4">John Doe</td>
              <td>john@email.com</td>
              <td className="text-green-600">Active</td>
            </tr>

            <tr className="border-t">
              <td className="p-4">Sara Smith</td>
              <td>sara@email.com</td>
              <td className="text-red-500">Blocked</td>
            </tr>

          </tbody>

        </table>

      </div>

    </div>
  );
}