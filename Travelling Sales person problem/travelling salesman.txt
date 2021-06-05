#include<stdio.h>
#include<stdlib.h>
#include<time.h>

void TSP(int* C, int* A, int* path, int* fpath, int *sum, int *fsum, int flag, int n, int b, int a, int *sc){
    int i,k;
    flag++;
    for(k=0;k<n;k++)
        if(*(C+n*flag+k)==0){
            *(C+n*flag+k)=k+1;
            *sum=*sum+*(A+n*b+k);
            *(path+flag-1)=k;

            if(flag<n){
                for(i=flag+1;i<n;i++)
                    *(C+i*n+k)=k+1;
            }

            if(flag<n-1)
                TSP(C,A,path,fpath,sum,fsum,flag,n,k,a,sc);

            if(flag==n-1){
                *sum=*sum+*(A+n*k+a);
                if(*sum==*fsum){
                    *sc=*sc+1;
                    for(i=0;i<n-1;i++)
                        *(fpath+(*sc)*(n-1)+i)=*(path+i);
                }
                else if(*sum<*fsum){
                    *fsum=*sum;
                    *sc=0;
                    for(i=0;i<n-1;i++)
                        *(fpath+i)=*(path+i);
                }
                *sum=*sum-*(A+n*k+a);
            }

            for(i=flag;i<n;i++)
                *(C+n*i+k)=0;
            *sum=*sum-*(A+n*b+k);
        }
}

int main(){
    printf("\n---------------------WELCOME-----------------------------\n\n\n");
	double total_time;
	clock_t start, end;
	start = clock();
	srand(time(NULL));

    int n,i,j,a,sc=0;
    float cost;
    printf("Please enter the number of holes to be drilled: ");
    scanf("%d",&n);
    printf("\n\nplease enter the cost for 1 unit coating : ");
    scanf("%f",&cost);
    printf("\nNOTE : in 1 unit time we can travel 1 unit distance\n");
    int A[n][n],C[n][n],sum=0,fsum=9999,path[n-1],fpath[1000][n-1];
    printf("\nPlease enter all the values of Adjacency Matrix:\n\n");
    for(i=0;i<n;i++){
        printf("\nenter the distance of all the %d holes from hole %d \n",n,i+1);
        for(j=0;j<n;j++)
            scanf(" %d",&A[i][j]);
    }

    printf("\n\nPlease enter the hole number from which you wanted to start drilling : ");
    scanf("%d",&a);
    for(i=0;i<n;i++)
        for(j=0;j<n;j++)
            C[i][j]=0;
    for(i=0;i<n;i++)
        C[i][a-1]=a;

    TSP(C,A,path,fpath,&sum,&fsum,0,n,a-1,a-1,&sc);

    printf("\n\nthe Minimum traveled distance is %d units.",fsum);
    printf("\n\nthe Minimum time took to drill all the holes is %d seconds.",fsum);
    printf("\n\nthe Minimum cost for coating = %f.",fsum*cost);
    for(i=0;i<=sc;i++){
        printf("\n\n\tpath direction type %d: %d -->",i+1,a);
        for(j=0;j<n-1;j++)
            printf(" %d -->",fpath[i][j]+1);
        printf(" %d.",a);
    }
    printf("\n\n");
    end = clock();
	total_time = ((double) (end - start))/CLOCKS_PER_SEC;
	printf("\nTime taken by this program to drill all the holes and coating between the holes : %f s", total_time);
	printf("\n\n");
}
