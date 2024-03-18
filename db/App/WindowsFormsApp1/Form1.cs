using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Data.SqlClient;

namespace WindowsFormsApp1
{
    public partial class Form1 : Form
    {
        SqlConnection conn;
        SqlDataAdapter daTeacher;
        SqlDataAdapter daCourse;
        DataSet dset;
        BindingSource bsTeacher;
        BindingSource bsCourse;
        SqlCommandBuilder cmdBuilder;
        string queryTeacher;
        string queryCourse;
        public Form1()
        {
            InitializeComponent();
            FillData();
        }
        void FillData()
        {
            try
            {

                conn = new SqlConnection("Data Source=DESKTOP-29QH5RP\\SQLEXPRESS;" + "Initial Catalog=School;Integrated Security=true");
                queryTeacher = "select * from Teachers";
                queryCourse = "select * from Courses";
                daTeacher = new SqlDataAdapter(queryTeacher, conn);
                daCourse = new SqlDataAdapter(queryCourse, conn);
                dset = new DataSet();
                daTeacher.Fill(dset, "Teacher");
                daCourse.Fill(dset, "Course");
                cmdBuilder = new SqlCommandBuilder(daCourse);
                dset.Relations.Add("TeacherCourse", dset.Tables["Teacher"].Columns["id"], dset.Tables["Course"].Columns["tid"]);
                this.dataGridView1.DataSource = dset.Tables["Teacher"];
                this.dataGridView2.DataSource = this.dataGridView1.DataSource;
                this.dataGridView2.DataMember = "TeacherCourse";
                cmdBuilder.GetUpdateCommand();
            }
            catch (Exception ex)
            {

            }

        }

        private void label2_Click(object sender, EventArgs e)
        {

        }

        private void label1_Click(object sender, EventArgs e)
        {

        }

        private void button1_Click(object sender, EventArgs e)
        {
            daCourse.Update(dset, "Course");
        }
    }
}
