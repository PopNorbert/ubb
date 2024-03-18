using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using Microsoft.VisualBasic;

namespace App
{
    internal class Program
    {
        static void Main(string[] args)
        {
            string conString = "Data Source=DESKTOP-29QH5RP\\SQLEXPRESS;" + "Initial Catalog=School;Integrated Security=true";
            SqlConnection con = new SqlConnection(conString);
            con.Open();
            string strTeacher = "select * from Teachers";
            SqlCommand cmd = new SqlCommand(strTeacher, con);
            using (SqlDataReader reader = cmd.ExecuteReader())
            {
                while (reader.Read())
                {
                    Console.WriteLine($"{reader[0]}, {reader[1]}");
                }
            }
            Console.WriteLine(12);
            SqlDataAdapter daTeachers = new SqlDataAdapter(strTeacher, con);
            DataSet dset = new DataSet();
            daTeachers.Fill(dset, "Teachers");
            foreach (DataRow pRow in dset.Tables["Teachers"].Rows) {
                Console.WriteLine($"{pRow["id"]},{pRow["name"]}");
            }
            con.Close();
        }
    }
}
