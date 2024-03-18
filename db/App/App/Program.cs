using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;

namespace App
{
    internal class Program
    {
        static void Main(string[] args)
        {
            string conString = "";
            SqlConnection con = new SqlConnection(conString);
            con.Open();
            string strStudent = "select * from Students";
            SqlCommand cmd = new SqlCommand(strStudent, con);
            using (SqlDataReader reader = cmd.ExecuteReader())
            {
                while (reader.Read())
                {
                    Console.WriteLine($"{reader[0]}, {reader[1]}");
                }
            }
            SqlDataAdapter daStudents = new SqlDataAdapter(strStudent, con);
            DataSet dset = new DataSet();
            daStudents.Fill(dset, "Students");
            foreach (DataRow pRow in dset.Tables["Students"].Rows) {
                Console.WriteLine($"{pRow["id"]},{pRow["name"]}");
            }
            con.Close();
        }
    }
}
