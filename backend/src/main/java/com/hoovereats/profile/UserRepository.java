package com.hoovereats.profile;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Integer> {

	@Query("SELECT u FROM User u WHERE u.uid = ?1")
	User findUserByUId(String uid);

	@Query("SELECT u FROM User u WHERE u.username = ?1")
	User findUserByUsername(String username);

//	@Query("SELECT u FROM User u WHERE u.username = ?1")
//	User findUserByUsername(String username);

}
